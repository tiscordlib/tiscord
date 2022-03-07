import { APIThreadChannel } from 'discord-api-types/v10';
import { Client, ThreadChannel } from '../';

/**
 * threads dont work in text channel ihope this fixes it
 * please dont use this
 * @param {Client} client - Client instance
 * @param {any} data - API thread channel data
 * @returns {ThreadChannel}
 */
export function threadWrapper(client: Client, data: APIThreadChannel) {
    return new ThreadChannel(client, data);
}
