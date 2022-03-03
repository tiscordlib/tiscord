import { APIMessage } from 'discord-api-types/v10';
import { APIError, Client, Message, TextChannel } from '../';

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

    /**
     * Fetches messages from the current channel
     * @param {string} around - Get messages around this message ID
     * @param {string} before - Get messages before this message ID
     * @param {string} after - Get messages after this message ID
     * @param {number} limit - Max number of messages to return (1-100)
     * @returns {Promise<Array<Message>>}
     */
    async fetchMessages(around?: string, before?: string, after?: string, limit?: number): Promise<Array<Message>> {
        const params = new URLSearchParams();
        params.append('around', around);
        params.append('before', before);
        params.append('after', after);
        params.append('limit', limit.toString());

        const request = (await this.client.rest.get(`/channels/${this.channel.id}/messages`, {
            query: params
        })) as any;

        if (request?.code) {
            throw new APIError(request?.message);
        }

        const map = request.map(m => new Message(this.client, m));

        map.forEach(m => {
            this.client.cache.messages.set(m.id, m);
        });

        return map;
    }
}
