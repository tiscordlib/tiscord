import { Client, Guild, TextChannel } from '../';

export async function messageDelete(client: Client, data: { d: any }) {
    const guild: Guild = client.cache.guilds.get(data.d.guild_id);
    const channel = (await guild.channels.get(data.d.channel_id)) as TextChannel;
    const message = await client.cache.messages.get(channel.id, data.d.id);
    if (message) client.emit('messageDelete', [guild, channel, data.d.id]);
}
