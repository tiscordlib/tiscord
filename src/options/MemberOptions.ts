/* eslint-disable camelcase */

/**
 * Member options, used for parsing members to an api readable format
 * @param {MemberOptions} data - Member data
 * @class
 * @property {string} nick - Members nickname
 * @property {string[]} roles - Members roles
 * @property {boolean} mute - If member is muted in a voice channel or not
 * @property {boolean} deaf - If member is deaf in a voice channel or not
 * @property {string} channel_id - ID of channel to move user to (if they are connected to voice)
 * @property {string} communication_disabled_until - When the member's timeout will expire
 */
export class MemberOptions {
	nick: string;
	roles: string[];
	mute: boolean;
	deaf: boolean;
	channel_id: string;
	communication_disabled_until?: string;
	constructor(data: RawMemberOptions) {
		if (data.nick) this.nick = data.nick;
		if (data.roles) this.roles = data.roles;
		if (data.mute) this.mute = data.mute;
		if (data.deaf) this.deaf = data.deaf;
		if (data.channelId) this.channel_id = data.channelId;
		if (data.communicationDisabledUntil)
			this.communication_disabled_until = data.communicationDisabledUntil;
	}
}

/**
 * Member options type
 * @typedef {MemberOptions} MessageOptions
 * @property {string} nick - Members nickname
 * @property {string[]} roles - Members roles
 * @property {boolean} mute - If member is muted in a voice channel or not
 * @property {boolean} deaf - If member is deaf in a voice channel or not
 * @property {string} channelId - ID of channel to move user to (if they are connected to voice)
 * @property {string} communicationDisabledUntil - When the member's timeout will expire
 */
export interface RawMemberOptions {
	nick?: string;
	roles?: string[];
	mute?: boolean;
	deaf?: boolean;
	channelId?: string;
	communicationDisabledUntil?: string;
}
