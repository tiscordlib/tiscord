import { Client, Guild, User } from '../';

export async function guildMemberRemove(client: Client, data: { d: any }) {
    const guild: Guild = client.cache.guilds.get(data.d.guild_id);
    const user = new User(client, data.d.user);
    client.cache.members.delete(guild.id, user.id);
    client.emit('guildMemberRemove', [guild, user]);
}
