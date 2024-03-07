import { Client, User } from '../../';

import { APIBan } from 'discord-api-types/v10';

/**
 * Guild ban class
 *
 * @param {Client} client - Client instance
 * @param {APIBan} data - Ban data
 * @class
 * @property {APIBan} [raw] - Raw ban data
 * @property {string} [reason] - Reason of the ban
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
        client.cache.users.set(this.user.id, this.user);
    }
}
