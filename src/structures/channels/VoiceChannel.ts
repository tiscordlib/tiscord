import type { APIGuildVoiceChannel } from "discord-api-types/v10";
import { TextChannel } from "../../";

/**
 * Voice channel class
 *
 * @param {Client} client - Client instance
 * @param {APIVoiceChannel} data - Channel data
 * @class
 * @extends {GuildChannel}
 * @property {number} bitrate - Bitrate of the voice channel
 * @property {number} userLimit - Maximum amount of users allowed in the voice channel
 * @property {string} rtcRegion - Region of the voice channel
 */
export class VoiceChannel extends TextChannel {
	bitrate: number;
	userLimit: number;
	rtcRegion: string;
	constructor(client: any, data: APIGuildVoiceChannel) {
		super(client, data);
		this.bitrate = data.bitrate;
		this.userLimit = data.user_limit;
		this.rtcRegion = data.rtc_region;
	}
}
