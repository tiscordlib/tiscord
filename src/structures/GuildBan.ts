import { APIBan } from 'discord-api-types/v10';
import { User } from './User';
import { Client } from '../client/Client';

/**
 * GuildBan class
 * @param {Client} client - Client instance
 * @param {APIBan} data - Ban data
 * @class
 * @property {Client} client - Client instance
 * @property {string} reason - Reason of the ban
 * @property {User} user - Banned user
 */
export class GuildBan {
    reason?: string;
    user: User;
    raw: APIBan;
    constructor(client: Client, data: APIBan) {
        if (data.reason) this.reason = data.reason;
        if (client.raw) this.raw = data;
        this.user = new User(client, data.user);
    }
}
