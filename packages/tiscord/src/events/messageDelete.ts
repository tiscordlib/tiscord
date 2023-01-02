import type { Client, Guild, TextChannel } from '../';
import type { GatewayMessageDeleteDispatchData } from 'discord-api-types/v10';

export async function messageDelete(client: Client, data: { d: GatewayMessageDeleteDispatchData }) {
    const guild: Guild = client.cache.guilds.get(BigInt(data.d.guild_id));
    const channel = (await guild.channels.get(BigInt(data.d.channel_id))) as TextChannel;
    const message = client.cache.messages.get(channel.id, BigInt(data.d.id));
    if (message) client.emit('messageDelete', [guild, channel, data.d.id]);
}
