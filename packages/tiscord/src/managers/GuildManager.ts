import { Client, Guild } from '../';

import { APIGuild } from 'discord-api-types/v10';

/**
 * Class managing channels
 * @param {Client} client - Client instance
 * @class
 * @property {Client} client - Client instance
 */
export class GuildManager {
    client: Client;
    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Gets a guild
     * @param {string} guild - Guild ID
     * @param {boolean} fetch - Whether to fetch the guild
     * @returns {Promise<Guild>}
     */
    async get(guild: string, fetch?) {
        const cache = this.client.cache.guilds.get(guild);
        if (cache && !fetch) return cache;
        const data = new Guild(this.client, (await this.client.rest.get(`/guilds/${guild}`)) as APIGuild);
        this.client.cache.guilds.set(guild, data);
        return data;
    }
}
