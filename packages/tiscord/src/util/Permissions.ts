import { BitField } from '../';

/**
 * A permission object, used for permission bitfield.
 * @typedef {Object} Permission
 */
export const PermissionsBitfield = {
    CREATE_INSTANT_INVITE: 1 << 0,
    KICK_MEMBERS: 1 << 1,
    BAN_MEMBERS: 1 << 2,
    ADMINISTRATOR: 1 << 3,
    MANAGE_CHANNELS: 1 << 4,
    MANAGE_GUILD: 1 << 5,
    ADD_REACTIONS: 1 << 6,
    VIEW_AUDIT_LOG: 1 << 7,
    PRIORITY_SPEAKER: 1 << 8,
    STREAM: 1 << 9,
    VIEW_CHANNEL: 1 << 10,
    SEND_MESSAGES: 1 << 11,
    SEND_TTS_MESSAGES: 1 << 12,
    MANAGE_MESSAGES: 1 << 13,
    EMBED_LINKS: 1 << 14,
    ATTACH_FILES: 1 << 15,
    READ_MESSAGE_HISTORY: 1 << 16,
    MENTION_EVERYONE: 1 << 17,
    USE_EXTERNAL_EMOJIS: 1 << 18,
    VIEW_GUILD_INSIGHTS: 1 << 19,
    CONNECT: 1 << 20,
    SPEAK: 1 << 21,
    MUTE_MEMBERS: 1 << 22,
    DEAFEN_MEMBERS: 1 << 23,
    MOVE_MEMBERS: 1 << 24,
    USE_VAD: 1 << 25,
    CHANGE_NICKNAME: 1 << 26,
    MANAGE_NICKNAMES: 1 << 27,
    MANAGE_ROLES: 1 << 28,
    MANAGE_WEBHOOKS: 1 << 29,
    MANAGE_EMOJIS_AND_STICKERS: 1n << 30n,
    USE_APPLICATION_COMMANDS: 1n << 31n,
    REQUEST_TO_SPEAK: 1n << 32n,
    MANAGE_EVENTS: 1n << 33n,
    MANAGE_THREADS: 1n << 34n,
    CREATE_PUBLIC_THREADS: 1n << 35n,
    CREATE_PRIVATE_THREADS: 1n << 36n,
    USE_EXTERNAL_STICKERS: 1n << 37n,
    SEND_MESSAGES_IN_THREADS: 1n << 38n,
    USE_EMBEDDED_ACTIVITES: 1n << 39n,
    MODERATE_MEMBERS: 1n << 40n
};

/**
 * Valid values for permissions
 * @typedef {Permission}
 */
export type PermissionType = keyof typeof PermissionsBitfield;

/**
 * A permission object, used for permission bitfield.
 * @class
 * @extends {BitField}
 * @param {(number|bigint|number[]|bigint[])} bits - Bitfield bits
 */
export class Permissions extends BitField {
    constructor(bits: number | bigint | number[] | bigint[]) {
        super(PermissionsBitfield, bits);
    }

    /**
     * Checks whether the bitfield has a specific permission.
     * @param {PermissionsBitField} value - Value to check
     * @returns {boolean}
     */
    has(value: keyof typeof PermissionsBitfield): boolean {
        if (super.has('ADMINISTRATOR')) return true;
        return super.has(value);
    }
}
