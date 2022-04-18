import { APITeamMember, TeamMemberMembershipState } from 'discord-api-types/v10';
import { Client, User } from '../';

/**
 * Represents a team member.
 * @class
 * @param {Client} client - Client instance
 * @param {APITeamMember} data - Team member data
 * @property {string} id - Team member ID
 * @property {string} teamId - Team ID
 * @property {User} user - User instance
 */
export class TeamMember {
    membershipState: string;
    permissions: ['*'];
    user: User;
    teamId: string;
    raw: APITeamMember;
    constructor(client: Client, data: APITeamMember) {
        this.membershipState = TeamMemberMembershipState[data.membership_state];
        this.permissions = data.permissions;
        this.user = new User(client, data.user);
        this.teamId = data.team_id;
        if (client.raw) this.raw = data;
        client.cache.users.set(this.user.id, this.user);
    }
}
