import { APIChannel } from 'discord-api-types/v10';
import { Client } from '../../';

/**
 * Channel class
 *
 * @param {Client} client - Client instance
 * @param {APIChannel} data - Channel data
 * @class
 * @property {Client} client - Client instance
 * @property {string} id - Channel ID
 * @property {string} name - Channel name
 * @property {string} type - Channel type
 * @see https://discord.com/developers/docs/resources/channel#channel-object-channel-types
 * @property {APIChannel} raw - Raw channel data
 */
export class Channel {
    type: number;
    id: string;
    raw?: APIChannel;
    name: string;
    client: Client;
    constructor(client: Client, data: APIChannel) {
        this.id = data.id;
        // @ts-ignore
        this.type = data.type;
        this.name = data.name;
        this.raw = data;
        this.client = client;
    }
}
