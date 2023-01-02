import { STATUS_CODES } from 'node:http';
import type { ResponseData } from 'undici/types/dispatcher';
import type { APIRequest } from './APIRequest.js';
import { resolveRequest } from './APIRequest.js';
import { BucketQueueManager } from './BucketQueueManager.js';
import type { RESTClient } from './RESTClient';
import { APIError, parseErr, RateLimitedError, RESTError } from './RESTError.js';

export interface RequestManagerOptions {
    timings?: boolean;
    logger?: {
        debug?: (...args: any[]) => void;
        trace?: (...args: any[]) => void;
        header?: (() => string) | string;
    };
}

export class RequestManager {
    // maybe this'll be of some use someday
    // private buckets: Map<string, RateLimit> = new Map();

    /** The total amount of requests we can make until we're globally rate-limited. */
    public limit = 50;

    /** The time offset between us and Discord. */
    public offset = 0;

    /** Queue managers for different buckets */
    public buckets: Map<string, BucketQueueManager> = new Map();

    /** The remaining requests we can make until we're globally rate-limited. */
    public remaining = 50;

    /** When the global rate limit will reset. */
    public reset = Date.now() + 1e3;
    // eslint-disable-next-line no-empty-function
    constructor(public client: RESTClient, public init: RequestManagerOptions = {}) {}

    public get durUntilReset() {
        return this.reset + this.offset - Date.now();
    }
    public getBucket(route: RouteLike) {
        const majorId = /(?:channels|guilds|webhooks)\/(\d{17,19})/u.exec(route)?.[1] ?? 'global';

        const endpoint = route
            // strip ids
            .replace(/\d{17,19}/gu, ':id')
            // reactions are in the same bucket
            .replace(/\/reactions\/(.*)/u, '/reactions/:reaction');

        return [`${endpoint}:${majorId}`, majorId];
    }

    public get limited() {
        return this.remaining === 0 && Date.now() < this.reset;
    }

    public async makeRequest(bucket: BucketQueueManager, req: Required<APIRequest>): Promise<ResponseData> {
        if (this.init.timings) req.httpStartTime = Date.now();

        this.trace(`Sending ${req.method} to ${req.route}...`);

        const res = await this.client.execute(
            req,
            this.init.logger?.trace && !this.init.logger?.debug ? this.trace.bind(this) : undefined
        );
        const now = Date.now();

        if (req.useBaseURL) this.updateOffset(res);

        this.debug(
            `${req.method.toUpperCase()} ${req.route} -> ${res.statusCode} ${STATUS_CODES[res.statusCode]}${
                this.init.timings
                    ? ` (${now - req.startTime}ms${
                          now - req.httpStartTime === now - req.startTime
                              ? ''
                              : ` full; ${now - req.httpStartTime}ms http`
                      })`
                    : ''
            }`
        );

        if (res.statusCode < 200) {
            throw new RESTError(req, res);
        } else if (res.statusCode < 300) {
            if (req.useRateLimits) {
                this.updateHeaders(res);
            }

            return res;
        } else if (res.statusCode < 500) {
            switch (res.statusCode) {
                case 429: {
                    if (!req.useRateLimits)
                        throw new Error(`Ratelimited on non-bucketed request: ${req.method} ${req.route}`);
                    if (res.headers['x-ratelimit-global']) {
                        this.limit = Number(res.headers['x-ratelimit-global-limit']);
                        this.remaining = Number(res.headers['x-ratelimit-global-remaining']);
                        this.reset = Number(res.headers['x-ratelimit-global-reset']) * 1000;

                        if (req.retries < req.allowedRetries) {
                            req.retries++;
                            this.debug('got ratelimited at', bucket.id, '- retrying');

                            return this.queue(req);
                        }
                        throw new RateLimitedError(req, res, bucket.id);
                    } else {
                        return bucket.handleRateLimit(req, res);
                    }
                }
                case 401:
                    throw new Error('Token has been invalidated or was never valid');
                default: {
                    const text = await res.body.text();

                    try {
                        throw parseErr(req, res, JSON.parse(text), new Error().stack);
                    } catch (err) {
                        if (err instanceof APIError || err instanceof RateLimitedError) throw err;

                        throw new RESTError(req, res, text);
                    }
                }
            }
        } else {
            throw new RESTError(req, res);
        }
    }

    public queue<T>(
        route: RouteLike,

        options?: Omit<APIRequest, 'route'>
    ): Promise<Response<T>>;
    public queue<T>(req: APIRequest): Promise<Response<T>>;
    public queue<T>(
        req: APIRequest | RouteLike,

        options?: APIRequest
    ): Promise<ResponseData & { body: { json(): Promise<T> } }> {
        if (typeof req === 'string') {
            req = resolveRequest({ route: req, ...options });
        } else req = resolveRequest(req);

        if (this.init.timings) req.startTime = Date.now();

        if (!req.useRateLimits)
            return this.makeRequest(null as unknown as BucketQueueManager, req as Required<APIRequest>);

        const [endpoint, majorId] = this.getBucket(req.route as RouteLike);

        if (!this.buckets.has(endpoint)) {
            this.buckets.set(endpoint, new BucketQueueManager(this, endpoint, majorId));
        }

        return this.buckets.get(endpoint).queue(req);
    }

    private updateOffset(res: ResponseData) {
        const discordDate = new Date(res.headers.date).getTime();
        const local = Date.now();

        this.offset = local - discordDate;
    }

    // this doesn't need to run in the same tick as the request
    private updateHeaders(res: ResponseData) {
        this.remaining--;

        while (Date.now() > this.reset) {
            this.reset += 1e3;
            this.remaining = this.limit;
        }

        if (Boolean(res.headers['x-ratelimit-bucket']) || !res.headers['x-ratelimit-reset']) return;

        this.limit = Number(res.headers['x-ratelimit-limit']);
        this.remaining = Number(res.headers['x-ratelimit-remaining']);
        this.reset = Number(res.headers['x-ratelimit-reset']) * 1000;
    }

    /** @ignore */
    __log_header() {
        return '';
    }

    debug(...args: any[]) {
        this.init.logger?.debug?.(this.__log_header(), ...args);
    }

    private trace(...args: any[]) {
        this.init.logger?.trace?.(this.__log_header(), ...args);
    }
}

export type RouteLike = `/${string}`;
export type Response<T> = ResponseData & { body: { json(): Promise<T> } };
export function consumeJSON<D = any>(res: ResponseData & { body: { json(): Promise<D> } }): Promise<D> {
    if (res.headers['content-type'].includes('application/json')) {
        return res.body.json();
    }
    throw new Error('API response was not JSON');
}
