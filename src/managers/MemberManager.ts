import { Client, ErrorCode, Member, TiscordError } from '../';

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
    async get(id: bigint, fetch?: boolean): Promise<Member> {
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

    get me(): Member {
        const member = this.client.cache.members.get(this.guild, this.client.user.id);
        if (!member || typeof member === 'undefined') throw new TiscordError(ErrorCode.Client_Member_Not_Cached);
        return member;
    }

    get list() {
        return this.client.cache.members.all(this.guild);
    }
}
