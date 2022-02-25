import { APIInteraction, InteractionType } from 'discord-api-types/v9';
import { Client } from '../client/Client';
import { User } from './User';
export class Interaction {
    applicationId: string;
    type: string;
    guildId: string;
    id: string;
    token: string;
    user: any;
    raw: APIInteraction;
    data: any;
    channelId: string;
    guildLocale: string;
    locale: string;
    client: Client;
    constructor(client: Client, data: APIInteraction) {
        this.client = client;
        this.id = data.id;
        this.applicationId = data.application_id;
        this.type = InteractionType[data.type];
        this.guildId = data.guild_id;
        this.token = data.token;
        if (data.user) this.user = new User(data.user);
        this.channelId = data.channel_id;
        this.data = data.data;
        this.raw = data;
        this.guildLocale = data.guild_locale;
    }
}
