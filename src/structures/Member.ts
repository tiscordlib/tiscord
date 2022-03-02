import { APIGuildMember } from 'discord-api-types/v10';
import { User, Client } from '../';

/**
 * Member class
 * @param {Client} client - Client instance
 * @param {APIGuildMember} data - Member data
 * @class
 * @property {User} user - User instance
 * @property {string} nick - Guild nickname
 * @property {string} avatar - User avatar hash
 * @property {string} joinedAt - when did the member join the guild
 * @property {string[]} roles - array of role IDs
 * @property {string} premiumSince - Since when is the member boosting the guild
 * @property {string} deaf - Is the member deafened
 * @property {string} mute - Is the member muted
 * @property {string} id - Member ID
 * @property {APIGuildMember} raw - Raw member data
 */
export class Member {
    roles: string[];
    mute: boolean;
    deaf: boolean;
    premiumSince: string;
    joinedAt: string;
    avatar: string;
    nick: string;
    user: User;
    raw?: APIGuildMember;
    id: string;
    constructor(client: Client, data: APIGuildMember) {
        this.user = new User(client, data.user);
        this.nick = data.nick;
        this.avatar = data.avatar;
        this.joinedAt = data.joined_at;
        this.premiumSince = data.premium_since;
        this.deaf = data.deaf;
        this.mute = data.mute;
        this.roles = data.roles;
        if (client.raw) this.raw = data;
        this.id = this.user.id;
    }
}
