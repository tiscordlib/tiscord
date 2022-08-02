import { APIChannel } from 'discord-api-types/v10';
import { Client, channelType } from '../';

/**
 * Class managing channels
 * @param {Client} client - Client instance
 * @class
 * @property {Client} client - Client instance
 */
export class ChannelManager {
    client: Client;
    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Gets a channel
     * @param {bigint} channel - Channel ID
     * @param {boolean} fetch - Whether to fetch the channel
     * @returns {Promise<Channel>}
     */
    async get(channel: bigint, fetch?) {
        const cached = this.client.cache.channels.get(channel);
        if (cached && !fetch) return cached;
        const data: any = channelType(this.client, (await this.client.rest.get(`/channels/${channel}`)) as APIChannel);
        if (data.guilds) await data.guilds();
        this.client.cache.channels.set(data.id, data);
        return data;
    }
}
