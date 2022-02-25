import { APIGuildMember } from 'discord-api-types/v9';
import { User } from './User';

export class Member {
    roles: string[];
    mute: boolean;
    deaf: boolean;
    premiumSince: string;
    joinedAt: string;
    avatar: string;
    nick: string;
    user: User;
    raw: APIGuildMember;
    constructor(data: APIGuildMember) {
        this.user = new User(data.user);
        this.nick = data.nick;
        this.avatar = data.avatar;
        this.joinedAt = data.joined_at;
        this.premiumSince = data.premium_since;
        this.deaf = data.deaf;
        this.mute = data.mute;
        this.roles = data.roles;
        this.raw = data;
    }
}
