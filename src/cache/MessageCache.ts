import { Cache, Message } from "../";

/**
 *  Cache for channels, message, etc.
 *  @class
 */

export class MessageCache extends Cache<Message> {
	caches: Map<bigint, Map<bigint, any>> = new Map();
	limit: number;
	constructor(messageLimit = 50) {
		super();
		this.limit = messageLimit;
	}

	/**
	 * @param {string} parent - parent map to set in
	 * @param {any} object - object to set
	 * @returns {void}
	 */
	set(parent: bigint, object: Message): void {
		if (!this.caches.has(parent)) this.caches.set(parent, new Map());
		const cache = this.caches.get(parent);
		if (cache.size >= this.limit) {
			cache.delete(cache.keys().next().value);
		}
		cache.set(object.id, object);
	}
}
