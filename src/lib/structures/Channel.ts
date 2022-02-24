import { APIChannel } from 'discord-api-types/v9';

export class Channel {
    type: any;
    id: string;
    raw: APIChannel;
    name: string;
    constructor(data: APIChannel) {
        this.id = data.id;
        this.type = data.type;
        this.name = data.name;
        this.raw = data;
    }
}
