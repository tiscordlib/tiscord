import { Client, Member, TextChannel } from '../';

export async function typingStart(client: Client, data: { d: any }) {
    const guild = client.cache.guilds.get(data.d.guild_id);
    const channel: TextChannel = await guild.channels.get(data.d.channel_id);
    const member = new Member(client, data.d.member, guild);
    client.emit('typingStart', [guild, channel, member, data.d.timestamp]);
}
