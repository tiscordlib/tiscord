/* eslint-disable camelcase */

/**
 * Role options, used for parsing roles to an api readable format
 * @param {RoleOptions} data - Role data
 * @class
 * @property {string} name - Roles name
 * @property {string} permissions - Roles permissions
 * @property {number} color - Roles color in RGB color value
 * @property {boolean} hoist - 	Whether the role should be displayed separately in the sidebar
 * @property {string} unicode_emoji - The role's unicode emoji as a standard emoji
 * @property {boolean} mentionable - Whether the role should be mentionable
 */
export class RoleOptions {
    name: string;
    permissions: string;
    color: number;
    hoist: boolean;
    unicode_emoji: string;
    mentionable: boolean;
    constructor(data: RoleOptions) {
        this.name = data.name;
        this.permissions = data.permissions;
        this.color = data.color;
        this.hoist = data.hoist;
        this.unicode_emoji = data.unicode_emoji;
        this.mentionable = data.mentionable;
    }
}

/**
 * Message options type
 * @typedef {RoleOptions} RoleOptions
 * @property {string} name - Roles name
 * @property {string} permissions - Roles permissions
 * @property {number} color - Roles color in RGB color value
 * @property {boolean} hoist -    Whether the role should be displayed separately in the sidebar
 * @property {string} unicode_emoji - The role's unicode emoji as a standard emoji
 * @property {boolean} mentionable - Whether the role should be mentionable
 */
export interface RoleOptions {
    name: string;
    permissions: string;
    color: number;
    hoist: boolean;
    unicode_emoji: string;
    mentionable: boolean;
}
