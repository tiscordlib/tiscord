import { type Client, ErrorCode, type Guild, Member, TiscordError } from "../";

export async function guildMembersChunk(client: Client, data: { d: any }) {
	const { guild_id, members, chunk_index, chunk_count } = data.d;

	if (!(await client.guilds.get(guild_id)))
		throw new TiscordError(ErrorCode.Guild_Not_Found);
	const guild: Guild = await client.guilds.get(BigInt(guild_id));

	members.forEach((e) => {
		const member = new Member(client, e, guild);
		client.cache.members.set(guild.id, member);
	});
	if (chunk_index === chunk_count - 1)
		client.emit("guildMembersChunk", [guild]);
}
