import { Client, ThreadChannel } from "../";

import { APIThreadChannel } from "discord-api-types/v10";

export function threadWrapper(client: Client, data: APIThreadChannel) {
	const channel = new ThreadChannel(client, data);
	channel.guilds();
	return channel;
}
