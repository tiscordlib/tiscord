import FormData from 'form-data';
import undici from 'undici';
import { URLSearchParams } from 'node:url';
import { inspect } from 'node:util';
import type { RequestOptions, ResponseData } from 'undici/types/dispatcher';
import type { APIRequest } from './APIRequest';
import type { RouteLike } from './RequestManager.js';

/**
 * Utility class for easy HTTP requests to the Discord API. Can be used for other APIs if needed.
 */
export class RESTClient {
    // eslint-disable-next-line prettier/prettier

    /**
     * An authentication token to include in the `Authorization` header for requests.
     */
    #auth?: string;
    public baseURL?: string;

    /**
     * API version to add to the {@link RESTClient.baseURL}. Leave empty to not add a version at all.
     */
    public version?: number;
    public options: RESTClientOptions;

    public constructor(options: RESTClientOptions) {
        this.baseURL = options.baseURL;
        this.version = options.version;
        this.#auth = options.auth;

        delete options.baseURL;
        delete options.version;

        this.options = options;

        Object.defineProperty(this.options, 'auth', {
            value: this.options.auth,
            enumerable: false
        });
    }

    /**
     * Used for generating options based off of the client's options. Should not
     * be used directly.
     */
    public static createRESTOptions(clientOptions: any, token: string, tokenType: 'Bot' | 'Bearer'): RESTClientOptions {
        return {
            baseURL: clientOptions.httpBaseURL,
            version: clientOptions.apiVersion,
            auth: `${tokenType} ${token}`,
            userAgent: clientOptions.httpUserAgent,
            headers: {}
        };
    }
    public static getDefaultOptions(token: string): Required<RESTClientOptions> {
        return {
            baseURL: 'https://discord.com/api',
            version: 10,
            auth: `Bot ${token}`,
            userAgent: `DiscordBot (https://github.com/fuwa-org/fuwa; 0.0.0)`,
            headers: {}
        };
    }

    public setAuth(auth?: string) {
        this.#auth = auth;
        return this;
    }
    public getAuth() {
        return this.#auth;
    }

    public createHeaders(request: APIRequest): Record<string, string> {
        const headers: Record<string, string> = request.headers ?? {};

        if (this.options.headers) Object.assign(headers, this.options.headers);
        headers['user-agent'] = headers['user-agent'] ?? this.options.userAgent ?? 'Mozila/5.0 (compatible; Fuwa)';
        if (this.#auth && request.auth) headers.authorization = headers.authorization ?? this.#auth;
        if (request.reason && request.reason.length) headers['x-audit-log-reason'] = request.reason;
        if (request.locale && request.locale.length) headers['x-discord-locale'] = request.locale;

        return headers;
    }

    public formatRoute(route: RouteLike, versioned = true, useBase = true): string {
        if (!useBase) return route;
        return this.baseURL + (this.version && versioned ? `/v${this.version}` : '') + route;
    }

    public resolveBody(req: APIRequest): APIRequest {
        if (req.files?.length) {
            const data = new FormData();
            let i = 0;

            for (const file of req.files) {
                data.append(
                    // eslint-disable-next-line no-nested-ternary
                    file.key ? (typeof file.key === 'number' ? `files[${file.key}]` : file.key) : `files[${i++}]`,
                    file.data,
                    {
                        contentType: file.contentType,
                        filename: file.filename
                    }
                );
            }

            if (req.body) {
                data.append(
                    'payload_json',
                    JSON.stringify(req.body, (k, v) => (typeof v === 'bigint' ? v.toString() : v)),
                    {
                        contentType: 'application/json'
                    }
                );
                // else
                //     for (const key in req.body) {
                //         if ([null, undefined].includes(req.body[key])) continue;

                //         if (Array.isArray(req.body[key]))
                //             for (let i = 0; i < req.body[key].length; i++)
                //                 data.append(`${key}[${i}]`, JSON.stringify(req.body[key][i]));
                //         else
                //             data.append(
                //                 key,
                //                 JSON.stringify(req.body[key], (k, v) => (typeof v === 'bigint' ? v.toString() : v))
                //             );
                //     }
            }

            req.headers = data.getHeaders(req.headers);
            console.log(data.getBuffer().toString());
            req.body = data.getBuffer();
        } else if (typeof req.body === 'string') {
            req.body = Buffer.from(req.body);
            req.headers = {
                ...req.headers,
                'content-type': 'text/plain'
            };
        } else if (req.body instanceof Buffer) {
            req.headers = {
                ...req.headers,
                'content-type': 'application/octet-stream'
            };
        } else if (typeof req.body === 'object' && req.body !== null) {
            req.body = Buffer.from(
                JSON.stringify(req.body, (key, value) => {
                    typeof value === 'bigint' ? (value = value.toString()) : value;
                    return value;
                })
            );
            req.headers = {
                ...req.headers,
                'content-type': 'application/json'
            };
        }

        if (req.body) req.headers['content-length'] = Buffer.byteLength(req.body).toString();

        return req;
    }

    public createURL(request: APIRequest) {
        let query = '';
        if (request.query) {
            if (typeof request.query === 'object' && !(request.query instanceof URLSearchParams)) {
                request.query = new URLSearchParams(request.query);
            }
            query = `?${request.query.toString()}`;
        }

        return `${this.formatRoute(request.route as RouteLike, request.versioned, request.useBaseURL)}${query}`;
    }

    public execute(request: APIRequest, tracefunc?: any): Promise<ResponseData> {
        request = this.resolveBody(request);

        const options: RequestOptions = {
            method: request.method ?? 'GET',
            headers: this.createHeaders(request)
        } as RequestOptions;
        const url = this.createURL(request);

        if (request.body) options.body = request.body;

        if (tracefunc) {
            tracefunc(
                options.method,
                url,
                options.body
                    ? prettifyBody(
                          options.headers['content-type' as keyof typeof options['headers']],
                          options.body as Buffer
                      )
                    : ''
            );
        }

        return undici.request(url, options);
    }
}

export interface RESTClientOptions {
    baseURL?: string;
    version?: number;
    auth?: string;
    userAgent?: string;

    /** Additional headers to send */
    headers?: Record<string, string>;
}

function prettifyBody(contentType: string, body: Buffer) {
    if (contentType.startsWith('application/json')) {
        return inspect(JSON.parse(body.toString()), {
            depth: null,
            colors: false
        });
    }

    return body?.toString();
}
