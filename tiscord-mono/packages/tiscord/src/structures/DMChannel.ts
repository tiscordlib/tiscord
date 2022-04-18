import { Client, User } from '../';

import { Channel } from './Channel';

/**
 * DM Channel class
 *
 * @param {Client} client - Client instance
 * @param {APIChannel} data - Channel data
 * @class
 * @property {string} lastMessageId - ID of last message
 * @property {string} applicationId - ID of application (exists only if an application created the DM)
 * @property {string} ownerId - ID of DM creator
 * @property {string} icon - Icon hash
 * @property {User[]} recipients - Array of recipient users
 * @extends {Channel}
 */
export class DMChannel extends Channel {
    lastMessageId: string;
    recipients: User[];
    icon: string;
    ownerId: string;
    applicationId: string;
    constructor(client: Client, data: any) {
        super(client, data);
        this.lastMessageId = data.last_message_id;
        this.applicationId = data.application_id;
        this.ownerId = data.owner_id;
        this.icon = data.icon;
        this.recipients = data.recipients.map(user => new User(client, user));
    }
}
