import { Client, TeamMember } from "../../";
import { APITeam } from "discord-api-types/v10";

/**
 * Represents a team.
 * @class
 * @param {Client} client - Client instance
 * @param {APITeam} data - Team data
 * @property {bigint} id - Team ID
 * @property {string} name - Team name
 * @property {bigint} ownerUserId - Team owner ID
 * @property {TeamMember[]} members - Team members
 * @property {APITeam} [raw] - Raw team data
 */
export class Team {
	ownerUserId: bigint;
	#icon: bigint;
	id: bigint;
	name: string;
	members: TeamMember[];
	raw: any;
	constructor(client: Client, data: APITeam) {
		this.#icon = BigInt(`0x${data.icon}`);
		this.id = BigInt(data.id);
		this.name = data.name;
		this.ownerUserId = BigInt(data.owner_user_id);
		this.members = data.members.map((m) => new TeamMember(client, m));
		if (client.raw) this.raw = data;
	}

	/**
	 * Team icon hash
	 * @type {string}
	 */
	get icon() {
		return this.#icon.toString(16);
	}
}
