import type { APIDMChannel } from 'discord-api-types/v10';
import type { Client } from '../../';
import { User } from '../../';

import { Channel } from './Channel';

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
    constructor(client: Client, data: APIDMChannel) {
        super(client, data);
        this._patch(data);
    }
    _patch(data: APIDMChannel) {
        super._patch(data);
        if ('last_message_id' in data) this.lastMessageId = BigInt(data.last_message_id);
        // @ts-expect-error
        if ('owner_id' in data) this.ownerId = data.owner_id;
        // @ts-expect-error
        if ('icon' in data) this.#icon = BigInt(`0x${data.icon}`);
        if ('recipients' in data) this.recipients = data.recipients.map(user => new User(this.client, user));
    }

    /**
     * Icon hash
     * @type {string}
     */
    get icon() {
        return this.#icon.toString(16);
    }
}
