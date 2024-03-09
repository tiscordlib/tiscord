import type { AllowedMentionsTypes } from "discord-api-types/v10";

/**
 * A class for parsing allowed mentions to an API object.
 * @param {RawMentions} mentions - Data to parse
 * @class
 * @property {AllowedMentionsTypes} [parse] - Mentions that should be parsed
 * @property {string[]} [users] - The allowed users
 * @property {string[]} [roles] - The allowed roles
 * @property {string[]} [replied_user] - Whether to mention the user we're replying to
 */
export class AllowedMentions {
	parse?: AllowedMentionsTypes[];
	replied_user?: boolean;
	roles?: string[];
	users?: string[];
	constructor(mentions: RawMentions) {
		if (mentions.parse) this.parse = mentions.parse;
		if (mentions.roles) this.roles = mentions.roles;
		if (mentions.users) this.users = mentions.users;
		if (mentions.repliedUser) this.replied_user = mentions.repliedUser;
	}
}

/**
 * Data for allowed mentions to be later parsed.
 * @property {AllowedMentionsTypes[]} parse - Mentions that should be parsed
 * @property {string[]} roles - The allowed roles
 * @property {string[]} users - The allowed users
 * @property {boolean} repliedUser - Whether to mention the user we're replying to
 */
export interface RawMentions {
	parse?: AllowedMentionsTypes[];
	roles?: string[];
	users?: string[];
	repliedUser?: boolean;
}
