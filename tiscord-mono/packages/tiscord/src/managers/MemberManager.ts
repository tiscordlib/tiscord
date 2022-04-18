import { Client, Member } from '../';

import { APIGuildMember } from 'discord-api-types/v10';

/**
 * Class managing members
 * @param {Client} client - Client instance
 * @param {string} guild - Guild ID
 * @class
 * @property {Client} client - Client instance
 * @property {string} guild - Guild ID
 */
export class MemberManager {
    client: Client;
    guild: string;
    constructor(client: Client, guild: string) {
        this.client = client;
        this.guild = guild;
    }

    /**
     * Get a member
     * @param {string} id Member ID
     * @param {boolean} fetch whether to fetch the member from api
     * @returns {Promise<Member>}
     */
    async get(id: string, fetch?) {
        const cache = this.client.cache.members.get(this.guild, id);
        const guild = this.client.cache.guilds.get(this.guild);
        if (cache && !fetch) return cache;
        const data = new Member(
            this.client,
            (await this.client.rest.get(`/guilds/${this.guild}/members/${id}`)) as APIGuildMember,
            guild
        );
        await data.setup();
        this.client.cache.members.set(this.guild, data);
        return data;
    }
}
