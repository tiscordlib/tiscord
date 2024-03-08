import { Client, Guild, Message, TextChannel } from "../";
import { GatewayMessageUpdateDispatchData } from "discord-api-types/v10";

export async function messageUpdate(
	client: Client,
	data: { d: GatewayMessageUpdateDispatchData },
) {
	const guild: Guild = client.cache.guilds.get(BigInt(data.d.guild_id));
	const channel = (await guild.channels.get(
		BigInt(data.d.channel_id),
	)) as TextChannel;

	const oldMessage = client.cache.messages.get(channel.id, BigInt(data.d.id));
	// @ts-expect-error
	const newMessage = new Message(client, data.d);

	if (!oldMessage) return;
	await newMessage.guilds();

	client.cache.messages.set(newMessage.channelId, newMessage);
	client.emit("messageUpdate", oldMessage, newMessage);
}
