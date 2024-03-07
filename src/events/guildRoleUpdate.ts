import { Client, Guild, Role } from '../';

export async function guildRoleUpdate(client: Client, data: { d: any }) {
    const guild: Guild = client.cache.guilds.get(BigInt(data.d.guild_id));
    const role = new Role(client, data.d.role);
    const oldRole = client.cache.roles.get(guild.id, role.id);
    client.cache.roles.set(guild.id, role);
    client.emit('guildRoleUpdate', [guild, oldRole, role]);
}
