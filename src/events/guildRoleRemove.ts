import { Client } from "../";

export async function guildRoleRemove(client: Client, data: { d: any }) {
	const guild = client.cache.guilds.get(BigInt(data.d.guild_id));
	const role = client.cache.roles.get(guild.id, BigInt(data.d.role_id));
	if (role) client.emit("guildRoleRemove", [guild, role]);
	client.cache.roles.delete(guild.id, BigInt(data.d.role_id));
}
