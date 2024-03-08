import { Client, ErrorCode, Member, TiscordError, type Guild } from "../";

import { APIGuildMember } from "discord-api-types/v10";

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
	 * Request all members from the gateway, resolves when all members are cached, can take a lot of time.
	 * @param {string} query - string that username starts with, or an empty string to return all members
	 * @param {number} membersLimit - Amount of members to fetch
	 * @returns
	 */
	async requestMembers(query?: string, membersLimit?: number) {
		this.client.ws.requestGuildMembers({ guildId: this.guild });
		return new Promise((resolve) => {
			this.client.on("guildMembersChunk", (guild: Guild) => {
				if (guild.id === this.guild) resolve(guild.members);
			});
		});
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
		const member = this.client.cache.members.get(
			this.guild,
			this.client.user.id,
		);
		if (!member || typeof member === "undefined")
			throw new TiscordError(ErrorCode.Client_Member_Not_Cached);
		return member;
	}

	get list() {
		return this.client.cache.members.all(this.guild);
	}
}
