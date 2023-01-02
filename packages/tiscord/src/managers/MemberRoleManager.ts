import type { Member } from '../structures/guild/Member';
import { RoleManager } from './RoleManager';

export class MemberRoleManager extends RoleManager {
    member: Member;
    _roles: bigint[];
    constructor(member: Member, roles: bigint[]) {
        super(member.client, member.guildId);
        this.member = member;
        this._roles = roles;
    }
    get cache() {
        return this._roles.map(id => this.client.cache.roles.get(this.guild, id));
    }
    getAll() {
        return Promise.all(this._roles.map(id => this.member.guild.roles.get(id)));
    }
    // get color() {
    //     return this.cache.reduce((a, b) => {})
    // }
}
