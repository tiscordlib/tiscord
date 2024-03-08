/**
 * Invite creation options
 * @typedef {Object} InviteOptions
 * @property {number} max_age - Max age of the invite
 * @property {number} max_uses - Max uses of the invite
 * @property {boolean} temporary - Does the invite grant temporary membership
 * @property {boolean} unique - Is the invite unique
 * @see https://discord.com/developers/docs/resources/channel#create-channel-invite
 */
export class InviteOptions {
	max_age: number;
	max_uses: number;
	temporary: boolean;
	unique: boolean;
	reason: string;
	constructor(data: InviteData) {
		if (data?.maxAge) this.max_age = data.maxAge;
		if (data?.maxUses) this.max_uses = data.maxUses;
		if (data?.temporary) this.temporary = data.temporary;
		if (data?.unique) this.unique = data.unique;
	}
}

/**
 * Invite data
 * @typedef {Object} Invite
 * @property {number} maxAge - Max age of the invite
 * @property {number} maxUses - Max uses of the invite
 * @property {boolean} temporary - Does the invite grant temporary membership
 * @property {boolean} unique - Is the invite unique
 */
export interface InviteData {
	maxAge?: number;
	maxUses?: number;
	temporary?: boolean;
	unique?: boolean;
}
