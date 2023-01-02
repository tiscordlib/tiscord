import type { Client } from '../';
import { User } from '../';

/**
 * Parses options for guildMemberUpdate event
 * @param {Client} client - Client instance
 * @param {Object} data - Raw event data
 * @class
 * @property {Client} client - Client instance
 * @property {boolean} pending - Whether the member is pending verification
 * @property {string} guildId - ID of the guild
 * @property {string[]} roles - Array of role IDs
 * @property {User} user - User that the member belongs to
 * @property {string} nick - Guild nickname
 * @property {string} avatar - User avatar hash
 * @property {string} joinedAt - when did the member join the guild
 * @property {string} premiumSince - Since when is the member boosting the guild
 * @property {string} deaf - Is the member deafened
 * @property {string} mute - Is the member muted
 */
export class MemberEdit {
    client: Client;
    pending: boolean;
    guildId: string;
    roles: string[];
    user: User;
    nick: string;
    avatar: string;
    joinedAt: number;
    premiumSince: number;
    deaf: boolean;
    mute: boolean;
    constructor(client: Client, data: any) {
        this.client = client;
        this.guildId = data.guild_id;
        this.roles = data.roles;
        this.user = new User(this.client, data.user);
        this.nick = data.nick;
        this.avatar = data.avatar;
        this.joinedAt = new Date(data.joined_at).getTime() / 1000;
        this.premiumSince = new Date(data.premium_since).getTime() / 1000;
        this.deaf = data.deaf || false;
        this.mute = data.mute || false;
        this.pending = data.pending || false;
    }
}
