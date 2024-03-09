import type { Dispatcher } from "undici";

import type { APIRequest } from "./APIRequest.js";
import { RESTClient, type RESTClientOptions } from "./RESTClient.js";
import {
	RequestManager,
	type RequestManagerOptions,
	type RouteLike,
} from "./RequestManager.js";
import { DefaultDiscordOptions } from "./index.js";

type RequestOptions = Partial<APIRequest & { buf: boolean }>;
type Awaitable<T> = Promise<T> | T;

/**
 * A simple, typed yet unsafe at runtime REST wrapper for Discord,
 * exposing the documented endpoints in a type-safe way.
 */
export class REST extends RequestManager {
	beforeRequest:
		| ((options: RequestOptions) => Awaitable<RequestOptions>)
		| undefined = undefined;
	afterRequest:
		| ((
				options: RequestOptions,
				response: Dispatcher.ResponseData,
				text: string,
				json: any | null,
		  ) => Awaitable<void>)
		| undefined = undefined;

	constructor(
		token: string | undefined = process.env.DISCORD_TOKEN,
		options: RESTClientOptions = DefaultDiscordOptions,
		managerOptions: RequestManagerOptions = {},
	) {
		Object.assign(options, DefaultDiscordOptions);

		options.auth = token;

		super(new RESTClient(options), managerOptions);
	}

	/**
	 * Set or gets the authentication token for requests to use. Tokens require a
	 * token type, must be `Bot` or `Bearer`.
	 * @returns The REST client instance if the token was set, otherwise the
	 *     current token.
	 */
	token(token?: string | null) {
		if (token) {
			this.client.setAuth(token);
		}

		if (token === null) {
			this.client.setAuth(undefined);
		}

		return token ?? token === null ? this : this.client.getAuth();
	}

	/**
	 * Set a task to be run before a request is sent. The task is passed the
	 * request options, and is expected to return `undefined` _or_ modified
	 * options.
	 * @param cb Task to run before a request is sent.
	 * @returns The REST client instance.
	 */
	before(cb: REST["beforeRequest"]) {
		this.beforeRequest = cb;
		return this;
	}

	/**
	 * Set a task to be run after a request is sent. The task is passed the
	 * request options, the response data and parsed JSON from the response, and
	 * is not expected to return anything.
	 * @param cb Task to run after a request is sent.
	 * @returns The REST client instance.
	 */
	after(cb: REST["afterRequest"]) {
		this.afterRequest = cb;
		return this;
	}

	// #region Methods

	/**
	 * Send a request to the Discord API
	 * @param options Request data to send alongside boilerplate headers
	 * @returns JSON response from the API
	 */
	async request<T>(options: APIRequest & { buf?: boolean }): Promise<T> {
		const token = this.client.getAuth();
		if (token && !token.startsWith("Bot ") && !token.startsWith("Bearer ")) {
			this.client.setAuth(`Bot ${token}`);
		}

		const task = await this.beforeRequest?.(options);

		if (
			task &&
			typeof task === "object" &&
			!Array.isArray(task) &&
			task !== null
		) {
			Object.assign(options, task);
		}

		const res = await this.queue(options);

		if (options.buf)
			return res.body.arrayBuffer().then(Buffer.from) as Promise<T>;

		const text = await res.body.text();

		let json = null as any;

		try {
			json = JSON.parse(text);
		} catch (e) {
			// do nothing
		}

		await this.afterRequest?.(options, res, text, json);

		return json;
	}

	/**
	 * Send a HTTP GET request to the Discord API
	 * @param route Route to send the request to
	 * @param options Additional request options. `body` and `files` are ignored.
	 * @returns JSON response from the API
	 */
	get<T>(route: RouteLike, options?: RequestOptions) {
		if (options?.body) {
			options.body = undefined;
		}
		if (options?.files) {
			options.files = undefined;
		}

		return this.request<T>({
			method: "GET",
			route,
			...options,
		});
	}

	/**
	 * Send a HTTP POST request to the Discord API
	 * @param route Route to send the request to
	 * @param options Additional request options. `body` and `files` are merged if
	 *     both
	 * are supplied, using different strategies for `body` depending on
	 * {@link APIRequest.payloadJson}.
	 * @returns JSON response from the API
	 */
	post<T>(route: RouteLike, options?: RequestOptions) {
		return this.request<T>({
			method: "POST",
			route,
			...options,
		});
	}

	/**
	 * Send a HTTP PUT request to the Discord API
	 * @param route Route to send the request to
	 * @param options Additional request options. `body` and `files` are treated
	 *     like
	 * in {@link REST.post}.
	 * @returns JSON response from the API
	 */
	put<T>(route: RouteLike, options?: RequestOptions) {
		return this.request<T>({
			method: "PUT",
			route,
			...options,
		});
	}

	/**
	 * Send a HTTP PATCH request to the Discord API
	 * @param route Route to send the request to
	 * @param options Additional request options. `body` and `files` are treated
	 *     like
	 * in {@link REST.post}.
	 * @returns JSON response from the API
	 */
	patch<T>(route: RouteLike, options: RequestOptions) {
		return this.request<T>({
			method: "PATCH",
			route,
			...options,
		});
	}

	/**
	 * Send a HTTP DELETE request to the Discord API
	 * @param route Route to send the request to
	 * @param options Additional request options. `body` and `files` are ignored.
	 * @returns JSON/empty response from the API, usually 204 No Content therefore
	 *     empty
	 */
	delete<T>(route: RouteLike, options?: RequestOptions) {
		return this.request<T>({
			method: "DELETE",
			route,
			...options,
		});
	}

	/**
	 * Send a HTTP OPTIONS request to the Discord API
	 * @param route Route to send the request to
	 * @param options Additional request options.
	 */
	options<T>(route: RouteLike, options?: RequestOptions) {
		return this.request<T>({
			method: "OPTIONS",
			route,
			...options,
		});
	}

	/**
	 * Send a HTTP HEAD request to the Discord API
	 * @param route Route to send the request to
	 * @param options Additional request options.
	 * @returns Empty response from the API, headers are consumed internally.
	 */
	head<T>(route: RouteLike, options?: RequestOptions) {
		return this.request<T>({
			method: "HEAD",
			route,
			...options,
		});
	}

	// #endregion
}
