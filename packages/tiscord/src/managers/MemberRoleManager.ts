import { Member } from '../structures/guild/Member';
import { RoleManager } from './RoleManager';
import { Role } from '../structures/guild/Role';
import { ErrorCode, TiscordError } from '../errors/TiscordError';

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
     * Gets all the roles that the member has, and if they're not in cache it fetches them.
     * @returns {Role[]}
     */
    getAll() {
        return Promise.all(this._roles.map(id => this.member.guild.roles.get(id)));
    }

    /**
     * The role of the member with the highest position.
     * @type {Role}
     */
    get highest(): Role {
        return (this.cache as Role[]).sort((a, b) => b.position - a.position)[0];
    }

    /**
     * The main role of the client member in the guild.
     */
    get botRole() {
        if (!this.client.cache.members.get(this.guild, this.client.user.id))
            throw new TiscordError(ErrorCode.Client_Member_Not_Cached);
        return this.client.cache.roles.get(this.guild, this.client.user.id);
    }

    /**
     * Adds a role to the member
     * @param role
     */
    async add(role: Role | Role[] | bigint | bigint[]) {
        if (role instanceof Role) role = role.id;
        if (Array.isArray(role)) {
            for (let r of role) {
                if (r instanceof Role) r = r.id;
                await this.client.rest.put(`/guilds/${this.guild}/members/${this.member.id}/roles/${r.toString()}`);
            }
        } else {
            await this.client.rest.put(`/guilds/${this.guild}/members/${this.member.id}/roles/${role.toString()}`);
        }
    }

    /**
     * Removes a role from the member
     * @param role
     */
    async remove(role: Role | Role[] | bigint | bigint[]) {
        if (role instanceof Role) role = role.id;
        if (Array.isArray(role)) {
            for (let r of role) {
                if (r instanceof Role) r = r.id;
                await this.client.rest.delete(`/guilds/${this.guild}/members/${this.member.id}/roles/${r.toString()}`);
            }
        } else {
            await this.client.rest.delete(`/guilds/${this.guild}/members/${this.member.id}/roles/${role.toString()}`);
        }
    }
}
