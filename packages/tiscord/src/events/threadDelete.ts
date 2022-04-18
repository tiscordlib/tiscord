import { Client, ThreadChannel } from '../';

import { APIThreadChannel } from 'discord-api-types/v10';

export async function threadDelete(client: Client, data: { d: APIThreadChannel }) {
    const thread = new ThreadChannel(client, data.d);
    await thread.guilds();
    client.cache.channels.delete(thread.id);
    client.emit('threadDelete', thread);
}
