import { APIChannel } from 'discord-api-types/v10';
import { Client, DMChannel, GuildChannel, TextChannel, ThreadChannel, VoiceChannel } from '../';

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
     * @param {string} channel - Channel ID
     * @param {boolean} fetch - Whether to fetch the channel
     * @returns {Promise<Channel>}
     */
    async get(channel: string, fetch?) {
        const cached = this.client.cache.channels.get(channel);
        if (cached && !fetch) return cached;
        let data: any = (await this.client.rest.get(`/channels/${channel}`)) as APIChannel;
        switch (data.type) {
            case 0:
                data = new TextChannel(this.client, data);
                break;
            case 1:
                data = new DMChannel(this.client, data);
                break;
            case 2:
                data = new VoiceChannel(this.client, data);
                break;
            case 10:
                data = new ThreadChannel(this.client, data);
                break;
            case 11:
                data = new ThreadChannel(this.client, data);
                break;
            case 12:
                data = new ThreadChannel(this.client, data);
                break;
            case 13:
                data = new VoiceChannel(this.client, data);
                break;
            default:
                data = new GuildChannel(this.client, data);
                break;
        }
        this.client.cache.channels.set(data.id, data);
        return data;
    }
}
