import type { APIGuild } from 'discord-api-types/v10';
import type { Client } from '../';
import { Guild } from '../';

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
     * @param {bigint} guild - Guild ID
     * @param {boolean} fetch - Whether to fetch the guild
     * @returns {Promise<Guild>}
     */
    async get(guild: bigint, fetch?) {
        const cache = this.client.cache.guilds.get(guild);
        let data: Guild;
        if (cache && !fetch) return cache;
        const discordData = (await this.client.rest.get(`/guilds/${guild}`).catch(() => null)) as APIGuild;
        if (discordData) data = new Guild(this.client, discordData);
        if (guild) this.client.cache.guilds.set(guild, data);
        return data;
    }
}
