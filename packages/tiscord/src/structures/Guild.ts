import {
    APIEmoji,
    APIGuild,
    APIGuildScheduledEvent,
    APIStageInstance,
    GatewayVoiceState,
    GuildFeature,
    GuildSystemChannelFlags
} from 'discord-api-types/v10';
import {
    APIError,
    CDNOptions,
    ChannelManager,
    ChannelOptions,
    Client,
    Emoji,
    GuildBan,
    GuildEditOptions,
    GuildEditOptionsType,
    Invite,
    Member,
    MemberManager,
    Role,
    RoleOptions,
    RolesManager,
    Sticker,
    ThreadChannel,
    channelType
} from '../';

/**
 * Guild class
 *
 * @param {Client} client - Client instance
 * @param {APIGuild} data - Guild data
 * @class
 * @property {Client} client - Client instance
 * @property {string} ownerId - Guild owner ID
 * @property {User} owner - Guild owner
 * @property {string} discoverySplash - Discovery splash hash
 * @property {string} iconHash - Icon hash
 * @property {string} icon - Icon
 * @property {string} name - Guild name
 * @property {string} id - Guild ID
 * @property {boolean} premiumProgressBarEnabled - Whether the boost progress bar enabled
 * @property {APIGuildScheduledEvent[]} scheduledEvents - Scheduled events
 * @property {Sticker[]} stickers - Guild stickers
 * @property {APIStageInstance[]} stageInstances - Guild stage instances
 * @property {number} nsfwLevel - NSFW level
 * @property {number} maxVideoChannelUsers - How many users can be on a video channel
 * @property {string} publicUpdatesChannelId - Public update channel ID
 * @property {string} locale - Guild locale
 * @property {number} boosterCount - Amount of boosters
 * @property {number} premiumTier - Server boost tier
 * @property {string} banner - Banner hash
 * @property {string} description - Guild description
 * @property {string} vanityUrlCode - Guild vanity invite
 * @property {number} maxMembers - How many members can this guild handle
 * @property {any[]} presences - Guild presences
 * @property {ThreadChannel[]} threads - Guild threads
 * @property {ChannelManager} channels - Guild channels
 * @property {MemberManager} members - Guild members
 * @property {any} voiceStates - Guild voice states
 * @property {number} memberCount - Guild member count
 * @property {boolean} available - Whether the guild is available
 * @property {boolean} large - Whether the guild is large (by default 50+ members)
 * @property {number} joinedAt - When the guild was joined (unix timestamp)
 * @property {string} rulesChannelId - Rules channel ID
 * @property {string} systemChannelFlags - System channel flags
 * @property {string} systemChannelId - System channel ID
 * @property {string} applicationId - Application ID, if an application owns the guild.
 * @property {number} mfaLevel - 2FA level
 * @property {GuildFeature[]} features - Guild features
 * @property {APIEmoji[]} emojis - Guild emojis
 * @property {RolesManager} roles - Guild roles
 * @property {number} explicitContentFilter - Explicit content filter level
 * @property {number} defaultMessageNotifications - Default message notification level
 * @property {number} verificationLevel - Verification level
 * @property {string} widgetChannelId - Widget channel ID
 * @property {boolean} widgetEnabled - Whether the guild widget enabled
 * @property {number} afkTimeout - AFK timeout
 * @property {string} afkChannelId - AFK channel ID
 * @property {Member} me - Bot's guild member
 */
export class Guild {
    client: Client;
    ownerId: string;
    owner: boolean;
    discoverySplash: string;
    splash: string;
    iconHash: string;
    icon: string;
    name: string;
    id: string;
    premiumProgressBarEnabled: boolean;
    scheduledEvents: APIGuildScheduledEvent[];
    stickers: Sticker[];
    stageInstances: APIStageInstance[];
    nsfwLevel: number;
    maxVideoChannelUsers: number;
    publicUpdatesChannelId: string;
    locale: string;
    boosterCount: number;
    premiumTier: number;
    banner: string;
    description: string;
    vanityUrlCode: string;
    maxMembers: number;
    presences: any[];
    threads: ThreadChannel[];
    channels: ChannelManager;
    members: MemberManager;
    voiceStates: Omit<GatewayVoiceState, 'guild_id'>[];
    memberCount: number;
    available: boolean;
    large: boolean;
    joinedAt: number;
    rulesChannelId: string;
    systemChannelFlags: any;
    systemChannelId: string;
    applicationId: string;
    mfaLevel: number;
    features: GuildFeature[];
    emojis: APIEmoji[];
    roles: RolesManager;
    explicitContentFilter: number;
    defaultMessageNotifications: number;
    verificationLevel: number;
    widgetChannelId: string;
    widgetEnabled: boolean;
    afkTimeout: number;
    afkChannelId: string;
    permissions: string;
    raw?: APIGuild;
    me: Member | void;
    constructor(client: Client, data: APIGuild) {
        this.client = client;
        data.roles?.forEach(role => {
            client.cache.roles.set(data.id, new Role(client, role));
        });
        data.channels?.forEach((channel: any) => {
            channel = channelType(client, channel);
            if (!channel.guildId) channel.guildId = this.id;
            if (channel.guilds) channel.guilds();
            client.cache.channels.set(data.id, channel);
        });
        this.id = data.id;
        this.name = data.name;
        this.icon = data.icon;
        this.iconHash = data.icon_hash;
        this.splash = data.splash;
        this.discoverySplash = data.discovery_splash;
        this.owner = data.owner;
        this.ownerId = data.owner_id;
        this.afkChannelId = data.afk_channel_id;
        this.afkTimeout = data.afk_timeout;
        this.widgetEnabled = data.widget_enabled;
        this.widgetChannelId = data.widget_channel_id;
        this.verificationLevel = data.verification_level;
        this.defaultMessageNotifications = data.default_message_notifications;
        this.explicitContentFilter = data.explicit_content_filter;
        this.roles = new RolesManager(client, this.id);
        this.emojis = data.emojis?.map(emoji => new Emoji(client, emoji));
        this.features = data.features;
        this.mfaLevel = data.mfa_level;
        this.applicationId = data.application_id;
        this.systemChannelId = data.system_channel_id;
        this.systemChannelFlags = GuildSystemChannelFlags[data.system_channel_flags];
        this.rulesChannelId = data.rules_channel_id;
        this.joinedAt = new Date(data.joined_at).getTime() / 1000;
        this.large = data.large;
        this.available = !data.unavailable;
        this.memberCount = data.member_count;
        this.voiceStates = data.voice_states;
        this.members = new MemberManager(this.client, this.id);
        this.channels = this.client.channels;
        this.threads = data.threads?.map(t => {
            const thread = new ThreadChannel(this.client, t);
            thread.guilds();
            return thread;
        });
        this.presences = data.presences;
        this.maxMembers = data.max_members;
        this.vanityUrlCode = data.vanity_url_code;
        this.description = data.description;
        this.banner = data.banner;
        this.premiumTier = data.premium_tier;
        this.boosterCount = data.premium_subscription_count;
        this.locale = data.preferred_locale;
        this.publicUpdatesChannelId = data.public_updates_channel_id;
        this.maxVideoChannelUsers = data.max_video_channel_users;
        this.nsfwLevel = data.nsfw_level;
        this.stageInstances = data.stage_instances;
        this.stickers = data.stickers?.map(sticker => new Sticker(client, sticker));
        this.scheduledEvents = data.guild_scheduled_events;
        this.premiumProgressBarEnabled = data.premium_progress_bar_enabled;
        if (client.raw) this.raw = data;
        data.members?.forEach(member => {
            const data = new Member(client, member, this);
            data.setup();
            client.cache.members.set(data.id, data);
        });
        this.me = client.cache.members.get(this.id, client.user.id);
    }

    /**
     * Ban the member from the server
     * @param {GuildEditOptionsType} data - The stuff you want to edit
     */
    async edit(data: GuildEditOptionsType, reason?: string) {
        const request = (await this.client.rest.patch(`/guilds/${this.id}`, {
            body: new GuildEditOptions(data),
            reason
        })) as any;
        if (request?.code) {
            throw new APIError(request?.message);
        }
    }

    /**
     * Unban a banned user from the server
     * @param {string} userId - The ID of the user you want to unban
     * @param {string} reason - Reason of the unban
     */
    async unban(userId: string, reason?: string) {
        const request = (await this.client.rest.delete(`/guilds/${this.id}/bans/${userId}`, {
            reason
        })) as any;

        if (request?.code) {
            throw new APIError(request?.message);
        }
    }

    /**
     * Create a channel in the guild
     * @param {ChannelOptions} data - Data of the new channel
     * @param {string} reason - Reason of the creation
     */
    async createChannel(data: ChannelOptions, reason?: string) {
        const request = (await this.client.rest.post(`/guilds/${this.id}/channels`, {
            reason,
            body: new ChannelOptions(data)
        })) as any;

        if (request?.code) {
            throw new APIError(request?.message);
        }
    }

    /**
     * Returns a list of bans in the guild
     * @returns {Promise<Array<GuildBan>>}
     */
    async getBans(): Promise<Array<GuildBan>> {
        const request = (await this.client.rest.get(`/guilds/${this.id}/bans`)) as any;

        if (request?.code) {
            throw new APIError(request?.message);
        }

        return request.map(b => new GuildBan(this.client, b));
    }

    /**
     * Returns a list of bans in the guild
     * @param {string} userId - The ID of the user to get the ban of
     * @returns {Promise<GuildBan>}
     */
    async getBan(userId: string): Promise<GuildBan> {
        const request = (await this.client.rest.get(`/guilds/${this.id}/bans/${userId}`)) as any;

        if (request?.code) {
            throw new APIError(request?.message);
        }

        return new GuildBan(this.client, request);
    }

    /**
     * Creates a role in the guild
     * @param {RoleOptions} data - Data of the new role
     * @param {string} reason - Reason of the creation
     */
    async createRole(data: RoleOptions, reason?: string) {
        const request = (await this.client.rest.post(`/guilds/${this.id}/roles`, {
            reason,
            body: new RoleOptions(data)
        })) as any;

        if (request?.code) {
            throw new APIError(request?.message);
        }
    }

    /**
     * Get the icon URL of the guild
     * @returns {string}
     * @param {CDNOptions} options - Options for the link
     */
    iconURL(options: CDNOptions): string {
        // eslint-disable-next-line prettier/prettier
        return `https://cdn.discordapp.com/icons/${this.id}/${this.icon}.${options.format || 'png'}?size=${options.size || 512}`;
    }

    /**
     * Modify a roles position
     * @param {number} roleId - ID of the role
     * @param {number} position - Data of the new role
     * @param {string} reason - Reason of the edit
     */
    async modifyRolePosition(roleId: number, position: number, reason?: string) {
        const request = (await this.client.rest.patch(`/guilds/${this.id}/roles`, {
            reason,
            body: { id: roleId, position }
        })) as any;

        if (request?.code) {
            throw new APIError(request?.message);
        }
    }

    /**
     * Modify a role
     * @param {RoleOptions} data - Data of the new role
     * @param {string} reason - Reason of the modify
     */
    async modifyRole(data: RoleOptions, reason?: string) {
        const request = (await this.client.rest.patch(`/guilds/${this.id}/roles`, {
            reason,
            body: new RoleOptions(data)
        })) as any;

        if (request?.code) {
            throw new APIError(request?.message);
        }
    }

    /**
     * Deletes a role in the guild
     * @param {number} roleId - ID of the role
     * @param {string} reason - Reason of the creation
     */
    async deleteRole(roleId: number, reason?: string) {
        const request = (await this.client.rest.delete(`/guilds/${this.id}/roles/${roleId}`, {
            reason
        })) as any;

        if (request?.code) {
            throw new APIError(request?.message);
        }
    }

    /**
     * Gets the invites of the guild
     * @returns {Promise<Array<Invite>>}
     */
    async getInvites(): Promise<Array<Invite>> {
        const request = (await this.client.rest.get(`/guilds/${this.id}/invites`)) as any;

        if (request?.code) {
            throw new APIError(request?.message);
        }

        return request.map(i => new Invite(this.client, i));
    }

    /**
     * Get active threads in this guild
     * @returns {Promise<ThreadChannel[]>}
     */
    async getActiveThreads() {
        const request = (await this.client.rest.get(`/guilds/${this.id}/threads/active`)) as any;

        if (request?.code) {
            throw new APIError(request?.message);
        }

        return request.threads.map(i => {
            const channel = new ThreadChannel(this.client, i);
            channel.guilds();
            return channel;
        });
    }
}
