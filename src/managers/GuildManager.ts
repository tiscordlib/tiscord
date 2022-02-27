import { APIGuild } from 'discord-api-types/v10';
import { Client, Guild } from '../';

export class GuildManager {
    client: Client;
    constructor(client: Client) {
        this.client = client;
    }
    async get(guild: string, fetch?) {
        const cache = this.client.cache.guilds.get(guild);
        if (cache && !fetch) return cache;
        const data = new Guild(this.client, (await this.client.rest.get(`/guilds/${guild}`)) as APIGuild);
        this.client.cache.guilds.set(guild, data);
        return data;
    }
}
