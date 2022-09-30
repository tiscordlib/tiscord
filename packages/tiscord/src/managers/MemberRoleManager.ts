import { Member } from '../structures/guild/Member';
import { RoleManager } from './RoleManager';

export class MemberRoleManager {
    member: Member;
    roles: bigint[];
    get: RoleManager['get'];
    constructor(member: Member, roles: bigint[]) {
        this.member = member;
        this.roles = roles;
        this.get = this.member.guild.roles.get;
    }
    getAll() {
        return this.roles.map(id => this.get(id));
    }
}
