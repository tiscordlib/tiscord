/**
 * Caching options
 * @typedef {Object} CacheOptions
 * @property {number} messageLimit - How many messages to keep in the cache for a channel
 * @property {boolean} members - Whether members should be cached
 * @property {boolean} guilds - Whether guilds should be cached
 * @property {boolean} channels - Whether channels should be cached
 * @property {boolean} users - Whether users should be cached
 * @property {boolean} messages - Whether messages should be cached
 * @property {boolean} roles - Whether roles should be cached
 * @property {boolean} threadMembers - Whether thread members should be cached
 */
export interface CacheOptions {
	messageLimit?: number;
	members?: boolean;
	guilds?: boolean;
	channels?: boolean;
	users?: boolean;
	messages?: boolean;
	roles?: boolean;
	threadMembers?: boolean;
}
