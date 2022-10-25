import { Member } from '../structures/guild/Member';
import { RoleManager } from './RoleManager';

/**
 * Class managing roles of a member.
 * @param {Member} member - Member instance
 * @extends {RoleManager}
 * @class
 */
export class MemberRoleManager extends RoleManager {
    member: Member;
    _roles: bigint[];
    constructor(member: Member, roles: bigint[]) {
        super(member.client, member.guildId);
        this.member = member;
        this._roles = roles;
    }

    /**
     * Cache of roles that the member has
     * @type {Map}
     */
    get cache() {
        return this._roles.map(id => this.client.cache.roles.get(this.guild, id));
    }

    /**
     * Gets all of the roles that the member has, and if they're not in cache it fetches them.
     * @returns {Role[]}
     */
    getAll() {
        return Promise.all(this._roles.map(id => this.member.guild.roles.get(id)));
    }
}
