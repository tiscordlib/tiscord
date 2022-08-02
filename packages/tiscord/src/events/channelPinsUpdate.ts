import { Client } from '../';

export async function channelPinsUpdate(
    client: Client,
    data: { guild_id: string; channel_id: string; last_pin_timestamp: string }
) {
    const channel = await client.channels.get(BigInt(data.channel_id), true);
    client.emit('channelPinsUpdate', channel);
}
