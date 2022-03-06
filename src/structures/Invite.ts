import {
    APIApplication,
    APIChannel,
    APIGuildScheduledEvent,
    APIInvite,
    APIPartialGuild,
    APIUser
} from 'discord-api-types/v10';
import { Client } from '../';

/**
 * Channel class
 * @param {Client} client - Client instance
 * @param {APIInvite} data - Channel data
 * @class
 * @property {Client} client - Client instance
 * @property {string} code - Invites code
 * @property {APIPartialGuild} guild - Invites guild
 * @property {APIChannel} channel - Invites channel
 * @property {APIUser} inviter - The user who created the invite
 * @property {number} target_type - The type of target for this voice channel invite
 * @property {APIUser} target_user - The user whose stream to display for this voice channel stream invite
 * @property {Partial<APIApplication>} target_application - The embedded application to open for this voice channel embedded application invite
 * @property {number} approximate_presence_count - Approximate count of online members in the invite
 * @property {number} approximate_member_count - Approximate count of total members in the invite
 * @property {string} expires_at - When the invite expires
 * @property {APIGuildScheduledEvent} guild_scheduled_event - Guild scheduled event data
 * @see https://discord.com/developers/docs/resources/invite#invite-object
 * @property {APIInvite} raw - Raw channel data
 */
export class Invite {
    code: string;
    raw?: APIInvite;
    guild?: APIPartialGuild;
    channel: APIChannel;
    inviter?: APIUser;
    target_type?: number;
    target_user?: APIUser;
    target_application?: Partial<APIApplication>;
    approximate_presence_count?: number;
    approximate_member_count?: number;
    expires_at?: string;
    guild_scheduled_event?: APIGuildScheduledEvent;
    client: Client;
    constructor(client: Client, data: APIInvite) {
        this.code = data.code;
        if (data.guild) this.guild = data.guild;
        this.channel = data.channel;
        if (data.inviter) this.inviter = data.inviter;
        if (data.target_type) this.target_type = data.target_type;
        if (data.target_user) this.target_user = data.target_user;
        if (data.target_application) this.target_application = data.target_application;
        if (data.approximate_presence_count) this.approximate_presence_count = data.approximate_presence_count;
        if (data.approximate_member_count) this.approximate_member_count = data.approximate_member_count;
        if (data.expires_at) this.expires_at = data.expires_at;
        if (data.guild_scheduled_event) this.guild_scheduled_event = data.guild_scheduled_event;
        if (client.raw) this.raw = data;
        this.client = client;
    }
}
