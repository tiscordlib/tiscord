import type {
    APIGuild,
    APIGuildScheduledEvent,
    APIStageInstance,
    GatewayGuildCreateDispatchData,
    GatewayVoiceState,
    GuildFeature
} from 'discord-api-types/v10';
import type { CDNOptions, ChannelManager, Client, GuildEditOptionsType } from '../../';
import {
    APIError,
    ChannelOptions,
    Emoji,
    GuildBan,
    GuildEditOptions,
    Invite,
    MemberManager,
    Role,
    RoleOptions,
    RoleManager,
    Sticker,
    ThreadChannel,
    channelType
} from '../../';

/**
 * Class representing Guilds, otherwise known as servers.
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
 * @property {bigint} afkChannelId - AFK channel ID
 * @property {string} preferredLocale - Guild's preferred locale
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
    #animated: boolean;
    preferredLocale: string;
    constructor(client: Client, data: APIGuild | GatewayGuildCreateDispatchData) {
        this.client = client;
        this.roles = new RoleManager(this.client, this.id);
        this.members = new MemberManager(this.client, this.id);
        this.channels = this.client.channels;
        this._patch(data as any);
    }

    _patch(data: APIGuild & GatewayGuildCreateDispatchData) {
        if (data.icon?.startsWith('a_')) this.#animated = true;
        data.roles?.forEach(role => {
            this.client.cache.roles.set(BigInt(role.id), new Role(this.client, role));
        });
        data.channels?.forEach((channel: any) => {
            channel = channelType(this.client, channel);
            if (!channel.guildId) channel.guildId = this.id;
            if (channel.guilds) channel.guilds();
            this.client.cache.channels.set(BigInt(data.id), channel);
        });
        this.id ??= BigInt(data.id);
        if ('name' in data) this.name = data.name;
        if ('icon' in data) this.#icon = BigInt(`0x${this.#animated ? data.icon.replace('a_', '') : data.icon}`);
        if ('icon_hash' in data) this.#iconHash = BigInt(`0x${data.icon_hash}`);
        if ('splash' in data) this.#splash = BigInt(`0x${data.splash}`);
        if ('discovery_splash' in data) this.#discoverySplash = BigInt(`0x${data.discovery_splash}`);
        if ('banner' in data) this.#banner = BigInt(data.banner);
        if ('owner' in data) this.owner = data.owner;
        if ('owner_id' in data) this.ownerId = BigInt(data.owner_id);
        if ('afk_channel_id' in data) this.afkChannelId = BigInt(data.afk_channel_id);
        if ('afk_timeout' in data) this.afkTimeout = data.afk_timeout;
        if ('widget_enabled' in data) this.widgetEnabled = data.widget_enabled;
        if ('widget_channel_id' in data) this.widgetChannelId = BigInt(data.widget_channel_id);
        if ('verification_level' in data) this.verificationLevel = data.verification_level;
        if ('default_message_notifications' in data)
            this.defaultMessageNotifications = data.default_message_notifications;
        if ('explicit_content_filter' in data) this.explicitContentFilter = data.explicit_content_filter;
        if ('emojis' in data) this.emojis = data.emojis?.map(emoji => new Emoji(this.client, emoji));
        if ('features' in data) this.features = data.features;
        if ('mfa_level' in data) this.mfaLevel = data.mfa_level;
        if ('application_id' in data) this.applicationId = BigInt(data.application_id);
        if ('system_channel_id' in data) this.systemChannelId = BigInt(data.system_channel_id);
        if ('system_channel_flags' in data) this.systemChannelFlags = data.system_channel_flags;
        if ('rules_channel_id' in data) this.rulesChannelId = BigInt(data.rules_channel_id);
        if ('joined_at' in data) this.joinedAt = new Date(data.joined_at).getTime() / 1000;
        if ('large' in data) this.large = data.large;
        if ('unavailable' in data) this.available = !data.unavailable;
        if ('member_count' in data) this.memberCount = data.member_count;
        if ('voice_states' in data) this.voiceStates = data.voice_states;
        if ('threads' in data)
            this.threads = data.threads?.map(t => {
                const thread = new ThreadChannel(this.client, t);
                thread.guilds();
                return thread;
            });
        if ('presences' in data) this.presences = data.presences;
        if ('max_members' in data) this.maxMembers = data.max_members;
        if ('vanity_url_code' in data) this.vanityUrlCode = data.vanity_url_code;
        if ('description' in data) this.description = data.description;
        if ('premium_tier' in data) this.premiumTier = data.premium_tier;
        if ('premium_subscription_count' in data) this.boosterCount = data.premium_subscription_count;
        if ('preferred_locale' in data) this.preferredLocale = data.preferred_locale;
        if ('public_updates_channel_id' in data) this.publicUpdatesChannelId = BigInt(data.public_updates_channel_id);
        if ('max_video_channel_users' in data) this.maxVideoChannelUsers = data.max_video_channel_users;
        if ('nsfw_level' in data) this.nsfwLevel = data.nsfw_level;
        if ('stage_instances' in data) this.stageInstances = data.stage_instances;
        if ('stickers' in data) this.stickers = data.stickers?.map(sticker => new Sticker(this.client, sticker));
        if ('guild_scheduled_events' in data) this.scheduledEvents = data.guild_scheduled_events;
        if ('premium_progress_bar_enabled' in data) this.premiumProgressBarEnabled = data.premium_progress_bar_enabled;
        if (this.client.raw) this.raw = data;
    }

    /**
     * The app's guild member.
     * @type {Member}
     */
    get me() {
        return this.client.cache.members.get(this.id, this.client.user.id);
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
