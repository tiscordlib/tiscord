import { GatewayChannelPinsUpdateDispatch } from "discord-api-types/v10";
import { Client } from "../";

export async function channelPinsUpdate(
	client: Client,
	data: GatewayChannelPinsUpdateDispatch,
) {
	const channel = await client.channels.get(BigInt(data.d.channel_id), true);
	client.emit("channelPinsUpdate", channel);
}
