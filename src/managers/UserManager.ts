import { APIUser } from 'discord-api-types/v10';
import { Client, User } from '../';

export class UserManager {
    client: Client;
    cache: Map<string, User>;
    constructor(client: Client) {
        this.client = client;
        this.cache = new Map<string, User>();
    }
    async get(id: string, fetch?) {
        if (this.cache.has(id) && !fetch) return this.cache.get(id);
        const data = new User(this.client, (await this.client.rest.get(`/users/${id}`)) as APIUser);
        this.cache.set(id, data);
        return data;
    }
}
