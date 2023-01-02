import type { APIChannel } from 'discord-api-types/v10';
import type { Client, Channel } from '../';
import { channelType } from '../';

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
    async get(channel: bigint, fetch?): Promise<Channel> {
        const cached = this.client.cache.channels.get(channel);
        if (cached && !fetch) return cached;
        let data: any;
        const discordData = (await this.client.rest.get(`/channels/${channel}`).catch(() => null)) as APIChannel;
        if (discordData) data = channelType(this.client, discordData);
        if (data.guilds) await data.guilds();
        if (data) this.client.cache.channels.set(data.id, data);
        return data;
    }
}
