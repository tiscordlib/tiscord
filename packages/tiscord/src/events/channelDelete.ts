import { APIGuildChannel, ChannelType } from 'discord-api-types/v10';
import { Client, channelType } from '../';

export async function channelDelete(client: Client, data: { d: APIGuildChannel<any> }) {
    const channel = channelType(client, data.d);
    // @ts-ignore
    if (channel.type !== ChannelType.DM) await channel.guilds();
    client.cache.channels.delete(channel.id);
    client.emit('channelDelete', channel);
}
