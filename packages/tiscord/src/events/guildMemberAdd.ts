import type { Client } from '../';
import { Member } from '../';

export async function guildMemberAdd(client: Client, data: { d: any }) {
    const guild = client.cache.guilds.get(BigInt(data.d.guild_id));
    const member = new Member(client, data.d, guild);
    client.cache.members.set(guild.id, member);
    client.emit('guildMemberAdd', [guild, member]);
}
