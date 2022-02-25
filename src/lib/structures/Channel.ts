import { APIChannel } from 'discord-api-types/v9';
import { Client } from '../';

export class Channel {
    type: any;
    id: string;
    raw: APIChannel;
    name: string;
    client: Client;
    constructor(client: Client, data: APIChannel) {
        this.id = data.id;
        this.type = data.type;
        this.name = data.name;
        this.raw = data;
        this.client = client;
    }
}
