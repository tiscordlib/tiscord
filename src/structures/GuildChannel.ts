import { Channel } from './Channel';
import { APIError, Client } from '../';
import { ChannelOptions } from '../util/ChannelOptions';

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

    /**
     * Delete the channel
     * @param {string} reason - Reason of the deletion
     */
    async delete(reason?: string) {
        const request = (await this.client.rest.delete(`/channels/${this.id}`, {
            reason
        })) as any;

        if (request?.code) {
            throw new APIError(request?.message);
        }
    }

    /**
     * Edit the channel
     * @param {ChannelOptions} data - Data of the channels new values
     */
    async edit(data: ChannelOptions) {
        const request = (await this.client.rest.patch(`/channels/${this.id}`, {
            body: new ChannelOptions(data)
        })) as any;

        if (request?.code) {
            throw new APIError(request?.message);
        }
    }
}
