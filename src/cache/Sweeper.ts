import { Client, Message } from '../';

/**
 *  Exports functions to clean up the cache
 *  @param {Client} client - the client to sweep the cache
 *  @class
 */
export class Sweeper {
    constructor(client: Client) {
        this.client = client;
    }
    client: Client;

    /**
     * Cleans up the message cache
     * @returns {void}
     */
    async sweep() {
        const date = Date.now() / 1000 - this.client.messageTtl;
        this.client.cache.messages.caches.forEach(cache => {
            cache.forEach((message: Message, key) => {
                if (message.timestamp <= date) {
                    cache.delete(key);
                }
            });
        });
    }
}
