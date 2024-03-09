import { STATUS_CODES } from "node:http";
import type { Dispatcher } from "undici";
import type { APIRequest, File } from "./APIRequest";

export class RESTError extends Error {
	public body: any;

	constructor(
		req: APIRequest,
		res: Dispatcher.ResponseData,
		public error?: any,
	) {
		super();
		this.message = `${res.statusCode} ${STATUS_CODES[res.statusCode]} [${
			req.method
		} ${req.route}]`;
		this.name = "RESTError";
		this.body = req.body?.toString();
	}
}

export class RateLimitedError extends RESTError {
	public _message = "You are being rate limited.";

	constructor(req: APIRequest, res: Dispatcher.ResponseData, bucket?: string) {
		super(req, res);

		this.message = `429 Too Many Requests [${req.method} ${req.route}; bucket ${
			bucket ?? res.headers["x-ratelimit-bucket"]
		}] (retried ${req.retries} times)`;
		this.name = "RateLimitedError";
	}
}

/** Pretty-prints a Discord API error. */
export function parseErr(
	req: APIRequest,
	res: Dispatcher.ResponseData,
	error?: any,
	stack?: string,
) {
	if (res.statusCode === 429) {
		const bucket = res.headers["x-ratelimit-bucket"] as string;
		return new RateLimitedError(
			req,
			res,
			`${bucket} [${req.method} ${req.route}]`,
		);
	}

	if (stack && /Error\s*:?\n/iu.test(stack)) stack = stack.slice(8);

	return new APIError(req, res, error, stack);
}

function flattenErrors(error: any) {
	return {
		code: error.code,
		message: error.message,
		errors: error.errors ? traverse(error.errors) : undefined,
	};
}

function traverse(obj: any, keyPrefix = "", prev: Record<string, any> = {}) {
	for (const key in obj) {
		if (key === "_errors") {
			for (let i = 0; i < obj[key].length; i++) {
				const err = obj[key][i];

				prev[keyPrefix.slice(1) || "[root]"] = `${err.code}: ${err.message}`;
			}
			// eslint-disable-next-line no-negated-condition
		} else
			prev = traverse(
				obj[key],
				keyPrefix +
					(!Number.isNaN(Number.parseInt(key)) ? `[${key}]` : `.${key}`),
				prev,
			);
	}

	return prev;
}

export class APIError extends Error {
	public route: string;
	public body: any;
	public files?: File[];
	public method: string;

	constructor(
		req: APIRequest,
		_res: Dispatcher.ResponseData,
		error?: any,
		stack?: string,
	) {
		super();

		const err = flattenErrors(error);

		this.message = `${err.message}`;
		if (err.code) this.name += ` [${err.code}]`;
		if (err.errors)
			this.message += `\n${Object.entries(err.errors)
				.map(([k, v]) => `${k}: ${v}`)
				.join("\n")}`;
		this.stack = `${this.name}: ${this.message}\n${stack ?? ""}`;
		this.route = req.route;

		this.files = req.files;
		this.method = req.method;

		if (req.headers?.["content-type"] === "application/json") {
			try {
				this.body = JSON.parse(req.body);
			} catch (e) {
				this.body = req.body;
			}
		} else {
			this.body = req.body;
		}
	}
}
