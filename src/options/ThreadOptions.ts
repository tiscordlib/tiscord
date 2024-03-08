/**
 * Base thread option class
 *  * @param {ThreadData} data - Thread data
 * @class
 * @property {string} name - Thread name
 * @property {number} auto_archive_duration - Thread auto archive duration
 * @property {number} rate_limit_per_user - Thread rate limit per user
 * @extends {BaseThreadOptions}
 */
export class BaseThreadOptions {
	name: string;
	auto_archive_duration: any;
	type: number;
	invitable: boolean;
	rate_limit_per_user: any;
	constructor(data: ThreadData) {
		this.name = data.name;
		this.auto_archive_duration = data.autoArchiveDuration;
		this.rate_limit_per_user = data.rateLimitPerUser;
	}
}

/**
 * Thread option class
 * @param {ThreadData} data - Thread data
 * @class
 * @property {number} type - Thread type
 * @property {boolean} invitable - Whether the thread is invitable
 * @extends {BaseThreadOptions}
 */

export class ThreadOptions extends BaseThreadOptions {
	constructor(data: ThreadData) {
		super(data);
		this.type = data.type || 11;
		this.invitable = data.invitable;
	}
}

/**
 * Thread data
 * @typedef {Object} ThreadData
 */
export interface ThreadData {
	name: string;
	autoArchiveDuration?: 60 | 1440 | 4320 | 10080;
	type?: number;
	invitable?: boolean;
	rateLimitPerUser?: number;
}
