import type { APIMessage } from "discord-api-types/v10";
import { type Client, Message } from "../";

export async function messageCreate(client: Client, data: { d: APIMessage }) {
	const message = new Message(client, data.d);
	await message.guilds();
	client.cache.messages.set(message.channelId, message);
	client.emit("messageCreate", message);
}
