import { type Client, Guild, Role } from "../";

export async function guildCreate(client: Client, data: { d: any }) {
	const oldGuild = client.cache.guilds.get(BigInt(data.d.id));
	const guild = new Guild(client, data.d);
	client.cache.guilds.set(guild.id, guild);

	const roles = (await client.rest
		.get(`/guilds/${guild.id}/roles`)
		.catch(() => null)) as any[];

	roles.forEach((role) => {
		const r = new Role(client, role);
		client.cache.roles.set(guild.id, r);
	});
	// @ts-expect-error
	if (oldGuild?.unavailable) return;
	client.emit("guildCreate", guild);
}
