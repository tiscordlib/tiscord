import { APIGuildMember } from 'discord-api-types/v10';
import { User, Client } from '../';

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
