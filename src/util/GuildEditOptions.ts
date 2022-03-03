/**
 * Options for editing guilds
 * @param {GuildEditOptionsType} data - Options data
 * @class
 * @property {string} name - Guild name
 * @property {number} verification_level - Guild verification level
 * @property {number} explicit_content_filter - Guild explicit content filter level
 * @property {number} defaultMessageNotifications - Guild default message notifications level
 * @property {string} afk_channel_id - Guild AFK channel ID
 * @property {number} afk_timeout - Guild AFK timeout
 * @property {any} icon - Guild icon
 * @property {string} owner_id - new owner id
 * @property {any} splash - Guild splash
 * @property {any} discovery_splash - Guild discovery splash
 * @property {any} banner - Guild banner
 */
export class GuildEditOptions {
    verification_level: number;
    name: string;
    default_message_notifications: number;
    explicit_content_filter: number;
    afk_channel_id: string;
    afk_timeout: number;
    icon: any;
    owner_id: string;
    splash: any;
    discovery_splash: any;
    banner: any;
    constructor(data: GuildEditOptionsType) {
        this.name = data.name;
        this.verification_level = data.verificationLevel;
        this.default_message_notifications = data.defaultMessageNotifications;
        this.explicit_content_filter = data.nsfwFilter;
        this.afk_channel_id = data.afkChannelId;
        this.afk_timeout = data.afkTimeout;
        this.icon = data.icon;
        this.owner_id = data.owner;
        this.splash = data.splash;
        this.discovery_splash = data.discoverySplash;
        this.banner = data.banner;
    }
}

/**
 * Types for options for editing guilds
 * @typedef {Object} GuildEditOptions
 * @property {string} name - Guild name
 * @property {number} verificationLevel - Guild verification level
 * @property {number} defaultMessageNotifications - Guild default message notifications level
 * @property {number} nsfwFilter - Guild explicit content filter level
 * @property {string} afkChannelId - Guild afk channel id
 * @property {number} afkTimeout - Guild afk timeout
 * @property {any} icon - Guild icon
 * @property {string} owner - New owner ID
 * @property {any} splash - Guild splash
 * @property {any} discoverySplash - Guild discovery splash
 * @property {any} banner - Guild banner
 * @property {string} systemChannelId - Guild system channel id
 * @property {number} systemChannelFlags - Guild system channel flags
 * @property {string} rulesChannelId - Guild rules channel id
 * @property {string} publicUpdatesChannelId - Guild public updates channel id
 * @property {string} preferredLocale - Guild preferred locale
 * @property {string} description - Guild description
 * @property {string[]} features - Guild features
 * @property {boolean} premiumProgressBarEnabled
 */
export interface GuildEditOptionsType {
    name?: string;
    verificationLevel?: number;
    defaultMessageNotifications?: number;
    nsfwFilter?: number;
    afkChannelId?: string;
    afkTimeout?: number;
    icon?: any;
    owner?: string;
    splash?: any;
    discoverySplash?: any;
    banner?: any;
    systemChannelId?: string;
    systemChannelFlags?: number;
    rulesChannelId?: string;
    publicUpdatesChannelId?: string;
    preferredLocale?: string;
    features?: string;
    description?: string;
    premiumProgressBarEnabled: boolean;
}
