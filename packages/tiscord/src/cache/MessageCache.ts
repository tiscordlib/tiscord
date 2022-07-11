import { Cache, Client, Message } from '../';

/**
 *  Cache for channels, message, etc.
 *  @class
 */

export class MessageCache extends Cache<Message> {
    caches: Map<string, Map<string, any>>;
    client: Client;
    constructor(client: Client) {
        super();
        this.client = client;
        this.caches = new Map();
    }

    /**
     * @param {string} parent - parent map to set in
     * @param {any} object - object to set
     * @returns {void}
     */
    set(parent: string, object: any): void {
        if (!this.caches.has(parent)) this.caches.set(parent, new Map());
        const cache = this.caches.get(parent);
        if (cache.size >= (this.client.cacheOptions?.messageLimit || 50)) {
            cache.delete(cache.keys().next().value);
        }
        cache.set(object.id || object.userId, object);
    }
}
