import { APIGuildChannel, ChannelType } from "discord-api-types/v10";
import { Client, channelType } from "../";

export async function channelUpdate(
	client: Client,
	data: { d: APIGuildChannel<any> },
) {
	const oldChannel = client.cache.channels.get(BigInt(data.d.id));
	const channel = channelType(client, data.d);
	// @ts-expect-error
	if (channel.type !== ChannelType.DM) await channel.guilds();
	client.cache.channels.set(channel.id, channel);
	client.emit("channelUpdate", [oldChannel, channel]);
}
