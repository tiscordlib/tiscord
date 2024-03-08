import { Client, ThreadChannel } from "../";

import { APIGuildChannel } from "discord-api-types/v10";

export async function threadUpdate(
	client: Client,
	data: { d: APIGuildChannel<any> },
) {
	const oldChannel = client.cache.channels.get(BigInt(data.d.id));
	const channel = new ThreadChannel(client, data.d);
	await channel.guilds();
	client.cache.channels.set(channel.id, channel);
	client.emit("threadUpdate", [oldChannel, channel]);
}
