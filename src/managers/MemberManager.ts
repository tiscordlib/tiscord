import { APIGuildMember } from 'discord-api-types/v10';
import { Client, Member } from '../';

export class MemberManager {
    client: Client;
    guild: string;
    constructor(client: Client, guild: string) {
        this.client = client;
        this.guild = guild;
    }
    async get(id: string, fetch?) {
        const cache = this.client.cache.members.get(this.guild, id);
        if (cache && !fetch) return cache;
        const data = new Member(
            this.client,
            (await this.client.rest.get(`/guilds/${this.guild}/members/${id}`)) as APIGuildMember
        );
        this.client.cache.members.set(this.guild, data);
        return data;
    }
}
