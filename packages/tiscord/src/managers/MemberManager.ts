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
    guild: bigint;
    constructor(client: Client, guild: bigint) {
        this.client = client;
        this.guild = guild;
    }

    /**
     * Get a member
     * @param {bigint} id Member ID
     * @param {boolean} fetch whether to fetch the member from api
     * @returns {Promise<Member>}
     */
    async get(id: bigint, fetch?) {
        const cache = this.client.cache.members.get(this.guild, id);
        const guild = this.client.cache.guilds.get(this.guild);
        let data: Member;
        if (cache && !fetch) return cache;
        const discordData = (await this.client.rest
            .get(`/guilds/${this.guild}/members/${id}`)
            .catch(() => null)) as APIGuildMember;
        if (discordData) data = new Member(this.client, discordData, guild);
        if (data) this.client.cache.members.set(this.guild, data);
        return data;
    }
}
