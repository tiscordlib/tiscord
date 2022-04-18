import { Client, ThreadChannel } from '../';

import { APIGuildChannel } from 'discord-api-types/v10';

export async function threadCreate(client: Client, data: { d: APIGuildChannel<any> }) {
    const channel = new ThreadChannel(client, data.d);
    await channel.guilds();
    client.cache.channels.set(channel.id, channel);
    client.emit('threadCreate', channel);
}
