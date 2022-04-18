import {
    APIApplication,
    APIChannel,
    APIGuildScheduledEvent,
    APIInvite,
    APIPartialGuild,
    APIUser
} from 'discord-api-types/v10';
import { Client, Guild, User } from '../';

/**
 * Channel class
 *
 * @param {Client} client - Client instance
 * @param {APIInvite} data - Channel data
 * @class
 * @property {Client} client - Client instance
 * @property {string} code - Invites code
 * @property {APIPartialGuild} [guild] - Invites guild
 * @property {APIChannel} channel - Invites channel
 * @property {APIUser} [inviter] - The user who created the invite
 * @property {number} [targetType] - The type of target for this voice channel invite
 * @property {User} [targetUser] - The user whose stream to display for this voice channel stream invite
 * @property {Partial<APIApplication>} [targetApplication] - The embedded application to open for this voice channel embedded application invite
 * @property {number} [approximatePresenceCount] - Approximate count of online members in the invite
 * @property {number} [approximateMemberCount] - Approximate count of total members in the invite
 * @property {string} [expiresAt] - When the invite expires
 * @property {APIGuildScheduledEvent} [guildScheduledEvent]  - Guild scheduled event data
 * @see https://discord.com/developers/docs/resources/invite#invite-object
 * @property {APIInvite} [raw] - Raw invite data
 */
export class Invite {
    code: string;
    raw?: APIInvite;
    guild?: APIPartialGuild;
    channel: APIChannel;
    inviter?: APIUser;
    targetType?: number;
    targetUser?: User;
    targetApplication?: Partial<APIApplication>;
    approximatePresenceCount?: number;
    approximateMemberCount?: number;
    expiresAt?: string;
    guildScheduledEvent?: APIGuildScheduledEvent;
    client: Client;
    constructor(client: Client, data: APIInvite) {
        this.code = data.code;
        // @ts-ignore
        if (data.guild) this.guild = new Guild(data.guild);
        // TODO: actually use real channels
        // @ts-ignore
        this.channel = data.channel;
        if (data.inviter) this.inviter = new User(client, data.inviter);
        if (data.target_type) this.targetType = data.target_type;
        if (data.target_user) this.targetUser = new User(client, data.target_user);
        if (data.target_application) this.targetApplication = data.target_application;
        if (data.approximate_presence_count) this.approximatePresenceCount = data.approximate_presence_count;
        if (data.approximate_member_count) this.approximateMemberCount = data.approximate_member_count;
        if (data.expires_at) this.expiresAt = data.expires_at;
        if (data.guild_scheduled_event) this.guildScheduledEvent = data.guild_scheduled_event;
        if (client.raw) this.raw = data;
        this.client = client;
        if (data.target_user) client.cache.users.set(this.targetUser.id, this.targetUser);
    }
}
