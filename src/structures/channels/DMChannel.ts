import { Client, User } from "../../";

import { Channel } from "./Channel";

/**
 * DM Channel class
 *
 * @param {Client} client - Client instance
 * @param {APIChannel} data - Channel data
 * @class
 * @property {bigint} lastMessageId - ID of last message
 * @property {bigint} applicationId - ID of application (exists only if an application created the DM)
 * @property {bigint} ownerId - ID of DM creator
 * @property {User[]} recipients - Array of recipient users
 * @extends {Channel}
 */
export class DMChannel extends Channel {
	lastMessageId: bigint;
	recipients: User[];
	#icon: bigint;
	ownerId: bigint;
	applicationId: bigint;
	constructor(client: Client, data: any) {
		super(client, data);
		this.lastMessageId = data.last_message_id;
		this.applicationId = data.application_id;
		this.ownerId = data.owner_id;
		this.#icon = BigInt(`0x${data.icon}`);
		this.recipients = data.recipients.map((user) => new User(client, user));
	}

	/**
	 * Icon hash
	 * @type {string}
	 */
	get icon() {
		return this.#icon.toString(16);
	}
}
