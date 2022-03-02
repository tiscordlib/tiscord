import { APIMessage } from 'discord-api-types/v10';
import { Client, Message, TextChannel } from '../';

/**
 * Class managing messages
 * @param {Client} client - Client instance
 * @param {TextChannel} channel - Channel instance
 * @class
 * @property {Client} client - Client instance
 * @property {TextChannel} channel - Channel instance
 */
export class MessageManager {
    client: Client;
    channel: TextChannel;
    constructor(client: Client, channel: TextChannel) {
        this.client = client;
        this.channel = channel;
    }

    /**
     * Get a message
     * @param {string} message Message ID
     * @returns {Promise<Message>}
     */
    async get(message: string) {
        const cache = this.client.cache.messages.get(this.channel.id, message);
        if (cache) return cache;
        let data: any = (await this.client.rest.get(`/channels/${this.channel.id}/messages/${message}`)) as APIMessage;
        data = new Message(this.client, data);
        this.client.cache.messages.set(this.channel.id, data);
        return data;
    }
}
