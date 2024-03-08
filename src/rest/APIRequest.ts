import { Locale } from "discord-api-types/rest/v10";
import { URLSearchParams } from "node:url";
import { Dispatcher } from "undici";
export interface APIRequest<T = any> {
	route: string;
	auth?: boolean;
	versioned?: boolean;
	query?: URLSearchParams | string | Record<string, any> | null;
	body?: T | null;
	files?: File[] | null;
	method?: Dispatcher.HttpMethod;
	headers?: Record<string, string>;
	reason?: string | null;
	locale?: Locale | null;
	useRateLimits?: boolean;
	useGlobalRateLimit?: boolean;
	useBaseURL?: boolean;

	allowedRetries?: number;
	retries?: number;

	payloadJson?: boolean;

	// timings
	startTime?: number;
	httpStartTime?: number;
}

export interface File {
	key?: string;
	filename?: string;
	data: Buffer;
	contentType?: string;
}

export function resolveRequest(req: APIRequest): Required<APIRequest> {
	return {
		auth: true,
		versioned: true,
		query: null,
		files: null,
		body: null,
		method: "GET",
		allowedRetries: 5,
		retries: 0,
		headers: {},
		reason: null,
		locale: null,
		useRateLimits: true,
		useGlobalRateLimit: req.auth !== false,
		useBaseURL: true,
		payloadJson: true,
		startTime: -1,
		httpStartTime: -1,
		...req,
	};
}
