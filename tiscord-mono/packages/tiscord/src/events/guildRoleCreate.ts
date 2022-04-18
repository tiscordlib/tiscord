import { Client, Guild, Role } from '../';

export async function guildRoleCreate(client: Client, data: { d: any }) {
    const guild: Guild = client.cache.guilds.get(data.d.guild_id);
    const role = new Role(client, data.d.role);
    client.cache.roles.set(guild.id, role);
    client.emit('guildRoleCreate', [guild, role]);
}
