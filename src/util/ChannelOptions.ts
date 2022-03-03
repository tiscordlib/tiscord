/* eslint-disable camelcase */
import { OverwriteType, ChannelType, APIVoiceRegion, VideoQualityMode } from 'discord-api-types/v10';

/**
 * Message options, used for parsing messages to an api readable format
 * @param {ChannelOptions} data - Message data
 * @class
 * @property {string} name - Channels name
 * @property {ChannelType} type - Channels type
 * @property {number} position - Channels position
 * @property {string} topic - Channels topic
 * @property {boolean} nsfw - If channel is NSFW or not
 * @property {number} rate_limit_per_user - Channels rate limit per user
 * @property {number} bitrate - Channels bitrate
 * @property {number} user_limit - Channels user limit
 * @property {Array<OverwriteType>} permission_overwrites - Channels permission overwrites
 * @property {number} parent_id - Channels parent ID
 * @property {APIVoiceRegion} rtc_region - Channels voice region
 * @property {VideoQualityMode} video_quality_mode - Channels video quality mode
 * @property {number} default_auto_archive_duration - Channels default auto archive duration (threads)
 */
export class ChannelOptions {
    name: string;
    type: ChannelType;
    position?: number;
    topic?: string;
    nsfw?: boolean;
    rate_limit_per_user?: number;
    bitrate?: number;
    user_limit?: number;
    permission_overwrites?: Array<OverwriteType>;
    parent_id?: number;
    rtc_region?: APIVoiceRegion;
    video_quality_mode?: VideoQualityMode;
    default_auto_archive_duration?: number;
    constructor(data: ChannelOptions) {
        this.name = data.name;
        this.type = data.type;
        if (data.position) this.position = data.position;
        if (data.topic) this.topic = data.topic;
        if (data.nsfw) this.nsfw = data.nsfw;
        if (data.rate_limit_per_user) this.rate_limit_per_user = data.rate_limit_per_user;
        if (data.bitrate) this.bitrate = data.bitrate;
        if (data.user_limit) this.user_limit = data.user_limit;
        if (data.parent_id) this.parent_id = data.parent_id;
        if (data.rtc_region) this.rtc_region = data.rtc_region;
        if (data.video_quality_mode) this.video_quality_mode = data.video_quality_mode;
        if (data.default_auto_archive_duration) this.default_auto_archive_duration = data.default_auto_archive_duration;
    }
}

/**
 * Message options type
 * @typedef {ChannelOptions} MessageOptions
 * @property {string} name - Channels name
 * @property {ChannelType} type - Channels type
 * @property {number} position - Channels position
 * @property {string} topic - Channels topic
 * @property {boolean} nsfw - If channel is NSFW or not
 * @property {number} rate_limit_per_user - Channels rate limit per user
 * @property {number} bitrate - Channels bitrate
 * @property {number} user_limit - Channels user limit
 * @property {Array<OverwriteType>} permission_overwrites - Channels permission overwrites
 * @property {number} parent_id - Channels parent ID
 * @property {APIVoiceRegion} rtc_region - Channels voice region
 * @property {VideoQualityMode} video_quality_mode - Channels video quality mode
 * @property {number} default_auto_archive_duration - Channels default auto archive duration (threads)
 */
export interface ChannelOptions {
    name: string;
    type: ChannelType;
    position?: number;
    topic?: string;
    nsfw?: boolean;
    rate_limit_per_user?: number;
    bitrate?: number;
    user_limit?: number;
    permission_overwrites?: Array<OverwriteType>;
    parent_id?: number;
    rtc_region?: APIVoiceRegion;
    video_quality_mode?: VideoQualityMode;
    default_auto_archive_duration?: number;
}
