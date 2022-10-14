import { Client, Role } from '..';

import { APIRole } from 'discord-api-types/v10';

/**
 * Class managing roles
 * @param {Client} client - Client instance
 * @class
 * @property {Client} client - Client instance
 * @property {string} guild - Guild ID
 */
export class RoleManager {
    client: Client;
    guild: bigint;
    constructor(client: Client, guild: bigint) {
        this.client = client;
        this.guild = guild;
    }

    /**
     * Get a role
     * @param {bigint} id Role ID
     * @param {boolean} fetch Whether to fetch the role from the API
     */
    async get(id: bigint, fetch?: boolean) {
        const cache = this.client.cache.roles.get(this.guild, id);
        if (cache && !fetch) return cache;

        const roles = (await this.client.rest.get(`/guilds/${this.guild}/roles`).catch(() => null)) as APIRole[];
        roles?.forEach(role => {
            this.client.cache.roles.set(this.guild, new Role(this.client, role));
        });
        return new Role(
            this.client,
            roles.find(role => BigInt(role.id) === id)
        );
    }
    get everyone() {
        return this.client.cache.roles.get(this.guild, this.guild);
    }
}
