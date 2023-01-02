import type { APIGuildVoiceChannel } from 'discord-api-types/v10';
import { TextChannel } from '../../';

/**
 * Voice channel class
 *
 * @param {Client} client - Client instance
 * @param {APIVoiceChannel} data - Channel data
 * @class
 * @extends {GuildChannel}
 * @property {number} userLimit - Maximum amount of users allowed in the voice channel
 * @property {string} rtcRegion - Region of the voice channel
 */
export class VoiceChannel extends TextChannel {
    userLimit: number;
    rtcRegion: string;
    constructor(client: any, data: APIGuildVoiceChannel) {
        // @ts-expect-error
        super(client, data);
    }
    // @ts-expect-error
    _patch(data: APIGuildVoiceChannel) {
        // @ts-expect-error
        super._patch(data);
        if ('user_limit' in data) this.userLimit = data.user_limit;
        if ('rtc_region' in data) this.rtcRegion = data.rtc_region;
    }
}
