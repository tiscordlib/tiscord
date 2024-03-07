import {
    APIGuild,
    APIGuildScheduledEvent,
    APIStageInstance,
    GatewayGuildCreateDispatchData,
    GatewayVoiceState,
    GuildFeature
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
    RoleManager,
    Sticker,
    ThreadChannel,
    channelType,
    InviteData
} from '../../';
import { GuildApplicationCommandManager } from '../../managers/GuildApplicationCommandManager';

/**
 * Guild class
 *
 * @param {Client} client - Client instance
 * @param {APIGuild} data - Guild data
 * @class
 * @property {Client} client - Client instance
 * @property {bigint} ownerId - Guild owner ID
 * @property {User} owner - Guild owner
 * @property {string} icon - Icon
 * @property {string} name - Guild name
 * @property {bigint} id - Guild ID
 * @property {boolean} premiumProgressBarEnabled - Whether the boost progress bar enabled
 * @property {APIGuildScheduledEvent[]} scheduledEvents - Scheduled events
 * @property {Sticker[]} stickers - Guild stickers
 * @property {APIStageInstance[]} stageInstances - Guild stage instances
 * @property {number} nsfwLevel - NSFW level
 * @property {number} maxVideoChannelUsers - How many users can be on a video channel
 * @property {bigint} publicUpdatesChannelId - Public update channel ID
 * @property {string} locale - Guild locale
 * @property {number} boosterCount - Amount of boosters
 * @property {number} premiumTier - Server boost tier
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
 * @property {bigint} rulesChannelId - Rules channel ID
 * @property {string} systemChannelFlags - System channel flags
 * @property {bigint} systemChannelId - System channel ID
 * @property {bigint} applicationId - Application ID, if an application owns the guild.
 * @property {number} mfaLevel - 2FA level
 * @property {GuildFeature[]} features - Guild features
 * @property {APIEmoji[]} emojis - Guild emojis
 * @property {RoleManager} roles - Guild roles
 * @property {number} explicitContentFilter - Explicit content filter level
 * @property {number} defaultMessageNotifications - Default message notification level
 * @property {number} verificationLevel - Verification level
 * @property {bigint} widgetChannelId - Widget channel ID
 * @property {boolean} widgetEnabled - Whether the guild widget enabled
 * @property {number} afkTimeout - AFK timeout
 * @property {GuildApplicationCommandManager} applicationCommands - Application command manager
 * @property {bigint} afkChannelId - AFK channel ID
 * @property {Member} me - Bot's guild member
 */
export class Guild {
    client: Client;
    ownerId: bigint;
    owner: boolean;
    #discoverySplash?: bigint;
    #splash?: bigint;
    #iconHash?: bigint;
    #icon?: bigint;
    name: string;
    id: bigint;
    premiumProgressBarEnabled: boolean;
    scheduledEvents: APIGuildScheduledEvent[];
    stickers: Sticker[];
    stageInstances: APIStageInstance[];
    nsfwLevel: number;
    maxVideoChannelUsers: number;
    publicUpdatesChannelId: bigint;
    locale: string;
    boosterCount: number;
    premiumTier: number;
    #banner: bigint;
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
    rulesChannelId: bigint;
    systemChannelFlags: any;
    systemChannelId: bigint;
    applicationId: bigint;
    mfaLevel: number;
    features: GuildFeature[];
    emojis: Emoji[];
    roles: RoleManager;
    explicitContentFilter: number;
    defaultMessageNotifications: number;
    verificationLevel: number;
    widgetChannelId: bigint;
    widgetEnabled: boolean;
    afkTimeout: number;
    afkChannelId: bigint;
    permissions: string;
    raw?: APIGuild;
    me: Member | void;
    #animated: boolean;
    applicationCommands: GuildApplicationCommandManager;
    constructor(client: Client, data: APIGuild | GatewayGuildCreateDispatchData) {
        if (data.icon?.startsWith('a_')) this.#animated = true;
        this.client = client;
        data.roles?.forEach(role => {
            client.cache.roles.set(BigInt(role.id), new Role(client, role));
        });
        // @ts-expect-error
        data.channels?.forEach((channel: any) => {
            channel = channelType(client, channel);
            if (!channel.guildId) channel.guildId = this.id;
            if (channel.guilds) channel.guilds();
            client.cache.channels.set(BigInt(data.id), channel);
        });
        this.id = BigInt(data.id);
        this.name = data.name;
        if (data.icon) this.#icon = BigInt(`0x${this.#animated ? data.icon.replace('a_', '') : data.icon}`);
        if (data.icon_hash) this.#iconHash = BigInt(`0x${data.icon_hash}`);
        if (data.splash) this.#splash = BigInt(`0x${data.splash}`);
        if (data.discovery_splash) this.#discoverySplash = BigInt(`0x${data.discovery_splash}`);
        if (data.banner) this.#banner = BigInt(data.banner);
        this.owner = data.owner;
        if (data.owner_id) this.ownerId = BigInt(data.owner_id);
        if (data.afk_channel_id) this.afkChannelId = BigInt(data.afk_channel_id);
        this.afkTimeout = data.afk_timeout;
        this.widgetEnabled = data.widget_enabled;
        if (data.widget_channel_id) this.widgetChannelId = BigInt(data.widget_channel_id);
        this.verificationLevel = data.verification_level;
        this.defaultMessageNotifications = data.default_message_notifications;
        this.explicitContentFilter = data.explicit_content_filter;
        this.roles = new RoleManager(client, this.id);
        this.emojis = data.emojis?.map(emoji => new Emoji(client, emoji));
        this.features = data.features;
        this.mfaLevel = data.mfa_level;
        this.applicationCommands = new GuildApplicationCommandManager(client, this.id);
        if (data.application_id) this.applicationId = BigInt(data.application_id);
        if (data.system_channel_id) this.systemChannelId = BigInt(data.system_channel_id);
        this.systemChannelFlags = data.system_channel_flags;
        if (data.rules_channel_id) this.rulesChannelId = BigInt(data.rules_channel_id);
        // @ts-expect-error
        if (data.joined_at) this.joinedAt = new Date(data.joined_at).getTime() / 1000;
        // @ts-expect-error
        this.large = data.large;
        // @ts-expect-error
        this.available = !data.unavailable;
        // @ts-expect-error
        this.memberCount = data.member_count;
        // @ts-expect-error
        this.voiceStates = data.voice_states;
        this.members = new MemberManager(this.client, this.id);
        this.channels = this.client.channels;
        // @ts-expect-error
        this.threads = data.threads?.map(t => {
            const thread = new ThreadChannel(this.client, t);
            thread.guilds();
            return thread;
        });
        // @ts-expect-error
        this.presences = data.presences;
        this.maxMembers = data.max_members;
        this.vanityUrlCode = data.vanity_url_code;
        this.description = data.description;
        this.premiumTier = data.premium_tier;
        this.boosterCount = data.premium_subscription_count;
        this.locale = data.preferred_locale;
        if (data.public_updates_channel_id) this.publicUpdatesChannelId = BigInt(data.public_updates_channel_id);
        this.maxVideoChannelUsers = data.max_video_channel_users;
        this.nsfwLevel = data.nsfw_level;
        // @ts-expect-error
        this.stageInstances = data.stage_instances;
        this.stickers = data.stickers?.map(sticker => new Sticker(client, sticker));
        // @ts-expect-error
        this.scheduledEvents = data.guild_scheduled_events;
        this.premiumProgressBarEnabled = data.premium_progress_bar_enabled;
        if (client.raw) this.raw = data;
        this.me = client.cache.members.get(this.id, client.user.id);
    }

    /**
     * The icon hash of the guild
     * @type {string}
     */
    get icon() {
        return (this.#animated ? 'a_' : '') + this.#icon.toString(16);
    }

    /**
     * The icon hash of the guild, returned when in template object
     * @type {string}
     */
    get iconHash() {
        return this.#iconHash?.toString(16);
    }

    /**
     * The guild splash
     * @type {string}
     */
    get splash() {
        return this.#splash?.toString(16);
    }

    /**
     * The guild banner
     * @type {string}
     */
    get banner() {
        return this.#banner?.toString(16);
    }

    /**
     * The guild splash, returned when guild has DISCOVERABLE feature
     * @type {string}
     */
    get discoverySplash() {
        return this.#discoverySplash.toString(16);
    }

    /**
     * Ban the member from the server
     * @param {GuildEditOptionsType} data - The stuff you want to edit
     * @param reason
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
     * @param {bigint} userId - The ID of the user you want to unban
     * @param {string} reason - Reason of the unban
     */
    async unban(userId: bigint, reason?: string) {
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
     * @param {bigint} userId - The ID of the user to get the ban of
     * @returns {Promise<GuildBan>}
     */
    async getBan(userId: bigint): Promise<GuildBan> {
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
     * @param {bigint} roleId - ID of the role
     * @param {number} position - Data of the new role
     * @param {string} reason - Reason of the edit
     */
    async modifyRolePosition(roleId: bigint, position: number, reason?: string) {
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
     * @param {bigint} roleId - ID of the role
     * @param {string} reason - Reason of the creation
     */
    async deleteRole(roleId: bigint, reason?: string) {
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
