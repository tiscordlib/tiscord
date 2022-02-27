import { Client, Message } from '../';

export class Sweeper {
    constructor(client: Client) {
        this.client = client;
    }
    client: Client;
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
