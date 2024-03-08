import { Client, Member } from "../";

export async function typingStart(client: Client, data: { d: any }) {
	const guild = client.cache.guilds.get(BigInt(data.d.guild_id));
	const channel = await guild.channels.get(BigInt(data.d.channel_id));
	const member = new Member(client, data.d.member, guild);
	client.emit("typingStart", [guild, channel, member, data.d.timestamp]);
}
