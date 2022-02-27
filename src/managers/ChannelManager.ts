import { APIChannel } from 'discord-api-types/v10';
import { Channel, Client } from '../';

export class ChannelManager {
    client: Client;
    constructor(client: Client) {
        this.client = client;
    }
    async get(channel: string, fetch?) {
        const cached = this.client.cache.channels.get(channel);
        if (cached && !fetch) return cached;
        const data = new Channel(this.client, (await this.client.rest.get(`/channels/${channel}`)) as APIChannel);
        this.client.cache.channels.set(data.id, data);
        return data;
    }
}
