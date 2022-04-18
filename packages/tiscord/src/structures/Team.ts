import { Client, TeamMember } from '../';
import { APITeam } from 'discord-api-types/v10';

/**
 * Represents a team.
 * @class
 * @param {Client} client - Client instance
 * @param {APITeam} data - Team data
 * @property {string} id - Team ID
 * @property {string} name - Team name
 * @property {string} icon - Team icon hash
 * @property {string} ownerUserId - Team owner ID
 * @property {TeamMember[]} members - Team members
 * @property {APITeam} [raw] - Raw team data
 */
export class Team {
    ownerUserId: string;
    icon: string;
    id: string;
    name: string;
    members: TeamMember[];
    raw: any;
    constructor(client: Client, data: APITeam) {
        this.icon = data.icon;
        this.id = data.id;
        this.name = data.name;
        this.ownerUserId = data.owner_user_id;
        this.members = data.members.map(m => new TeamMember(client, m));
        if (client.raw) this.raw = data;
    }
}
