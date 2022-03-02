import { APIInteraction, InteractionType } from 'discord-api-types/v10';

import { Client } from '../client/Client';
import { User } from './User';

/**
 * Interaction class
 *  @param {Client} client - Client instance
 * @param {APIInteraction} data - Interaction data
 * @class
 * @property {Client} client - Client instance
 * @property {string} id - Interaction ID
 * @property {string} type - Interaction type
 * @property {string} channelId - Channel ID
 * @property {string} applicationId - Application ID
 * @property {string} guildId - Guild ID
 * @property {string} token - Interaction token for replying
 * @property {User} user - User who started the interaction
 * @property {APIInteraction} raw - Raw interaction data
 * @property {any} data - Interaction data (options, etc.)
 * @property {string} guildLocale - Guild locale
 */
export class Interaction {
    applicationId: string;
    type: string;
    guildId: string;
    id: string;
    token: string;
    user: User;
    raw?: APIInteraction;
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
        if (data.user) this.user = new User(client, data.user);
        this.channelId = data.channel_id;
        this.data = data.data;
        if (client.raw) this.raw = data;
        this.guildLocale = data.guild_locale;
    }
}
