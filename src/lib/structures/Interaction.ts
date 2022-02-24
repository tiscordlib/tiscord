import { APIInteraction, InteractionType } from 'discord-api-types/v9';
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
    constructor(data: APIInteraction) {
        this.id = data.id;
        this.applicationId = data.application_id;
        this.type = InteractionType[data.type];
        this.guildId = data.guild_id;
        this.token = data.token;
        if (data.user) this.user = new User(data.user);
        this.channelId = data.channel_id;
        this.data = data.data;
        this.raw = data;
        this.locale = data.user.locale;
        this.guildLocale = data.guild_locale;
    }
}
