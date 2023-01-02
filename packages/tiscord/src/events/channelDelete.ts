import type { GatewayChannelDeleteDispatch } from 'discord-api-types/v10';
import { ChannelType } from 'discord-api-types/v10';
import type { Client } from '../';
import { channelType } from '../';

export async function channelDelete(client: Client, data: GatewayChannelDeleteDispatch) {
    const channel = channelType(client, data.d);
    // @ts-expect-error
    if (channel.type !== ChannelType.DM) await channel.guilds();
    client.cache.channels.delete(channel.id);
    client.emit('channelDelete', channel);
}
