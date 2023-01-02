import type { Client, Guild } from '../';
import { Member } from '../';

export async function guildMemberUpdate(client: Client, data: { d: any }) {
    const guild: Guild = client.cache.guilds.get(BigInt(data.d.guild_id));
    const member = guild.members?.get(BigInt(data.d.user.id));
    const options = new Member(client, data.d, guild);
    const newMember = member ? Object.assign(member, options) : undefined;
    client.cache.members.set(guild.id, newMember || options);
    client.emit('guildMemberUpdate', [guild, member, newMember]);
}
