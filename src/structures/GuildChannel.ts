import { Channel } from './Channel';
import { Client } from '../';

/**
 * A guild channel class.
 * @param {Client} client - Client instance
 * @param {any} data - API guild channel data
 * @extends {Channel}
 * @property {string} guildId - Guild id
 * @property {number} position - Channel position
 * @property {any[]} permissionOverwrites - Channel permission overwrites
 * @property {string} permissions - Channel permissions for the bot
 */
export class GuildChannel extends Channel {
    guildId: string;
    position: number;
    permissionOverwrites: any[];
    permissions: string;
    constructor(client: Client, data: any) {
        super(client, data);
        this.guildId = data.guild_id;
        this.position = data.position;
        this.permissionOverwrites = data.permission_overwrites;
        this.permissions = data.permissions;
    }
}
