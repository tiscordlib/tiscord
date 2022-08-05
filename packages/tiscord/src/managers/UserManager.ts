import { Client, User } from '../';

import { APIUser } from 'discord-api-types/v10';

/**
 * Class managing users
 * @param {Client} client - Client instance
 * @class
 * @property {Client} client - Client instance
 */
export class UserManager {
    client: Client;
    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Get an user
     * @param {bigint} id User ID
     * @param {boolean} fetch Whether to fetch the user from the API
     * @returns {Promise<User>}
     */
    async get(id: bigint, fetch?) {
        if (this.client.cache.users.has(id) && !fetch) return this.client.cache.users.get(id);
        const data = new User(this.client, (await this.client.rest.get(`/users/${id}`)) as APIUser);
        this.client.cache.users.set(id, data);
        return data;
    }
}
