/* eslint-disable camelcase */

/**
 * Member options, used for parsing members to an api readable format
 * @param {MemberOptions} data - Member data
 * @class
 * @property {string} nick - Members nickname
 * @property {Array<string>} roles - Members roles
 * @property {boolean} mute - If member is muted in a voice channel or not
 * @property {boolean} deaf - If member is deaf in a voice channel or not
 * @property {string} channel_id - ID of channel to move user to (if they are connected to voice)
 * @property {Date} communication_disabled_until - When the member's timeout will expire
 */
export class MemberOptions {
    nick: string;
    roles: Array<string>;
    mute: boolean;
    deaf: boolean;
    channel_id: string;
    communication_disabled_until?: Date;
    constructor(data: MemberOptions) {
        this.nick = data.nick;
        this.roles = data.roles;
        this.mute = data.mute;
        this.deaf = data.deaf;
        this.channel_id = data.channel_id;
        if (data.communication_disabled_until) this.communication_disabled_until = data.communication_disabled_until;
    }
}

/**
 * Message options type
 * @typedef {MemberOptions} MessageOptions
 * @property {string} nick - Members nickname
 * @property {Array<string>} roles - Members roles
 * @property {boolean} mute - If member is muted in a voice channel or not
 * @property {boolean} deaf - If member is deaf in a voice channel or not
 * @property {string} channel_id - ID of channel to move user to (if they are connected to voice)
 * @property {Date} communication_disabled_until - When the member's timeout will expire
 */
export interface MemberOptions {
    nick: string;
    roles: Array<string>;
    mute: boolean;
    deaf: boolean;
    channel_id: string;
    communication_disabled_until?: Date;
}
