import { APIMessage } from 'discord-api-types/v10';
import { Client, Message, TextChannel } from '../';
export class MessageManager {
    client: Client;
    channel: TextChannel;
    constructor(client: Client, channel: TextChannel) {
        this.client = client;
        this.channel = channel;
    }
    async get(message: string) {
        const cache = this.client.cache.messages.get(this.channel.id, message);
        if (cache) return cache;
        let data: any = (await this.client.rest.get(`/channels/${this.channel.id}/messages/${message}`)) as APIMessage;
        data = new Message(this.client, data);
        this.client.cache.messages.set(this.channel.id, data);
        return data;
    }
}
