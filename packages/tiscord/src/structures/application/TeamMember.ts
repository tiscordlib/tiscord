import type { APITeamMember } from 'discord-api-types/v10';
import type { Client } from '../../';
import { User } from '../../';

/**
 * Represents a team member.
 * @class
 * @param {Client} client - Client instance
 * @param {APITeamMember} data - Team member data
 * @property {bigint} id - Team member ID
 * @property {bigint} teamId - Team ID
 * @property {User} user - User instance
 */
export class TeamMember {
    membershipState: number;
    permissions: ['*'];
    user: User;
    teamId: bigint;
    raw: APITeamMember;
    constructor(client: Client, data: APITeamMember) {
        this.membershipState = data.membership_state;
        this.permissions = data.permissions;
        this.user = new User(client, data.user);
        this.teamId = BigInt(data.team_id);
        if (client.raw) this.raw = data;
        client.cache.users.set(this.user.id, this.user);
    }
}
