import { APIError, type Client, Message, type TextChannel } from "../";

import type { APIMessage } from "discord-api-types/v10";

/**
 * Class managing messages
 * @param {Client} client - Client instance
 * @param {TextChannel} channel - Channel instance
 * @class
 * @property {Client} client - Client instance
 * @property {TextChannel} channel - Channel instance
 */
export class MessageManager {
	client: Client;
	channel: TextChannel;
	constructor(client: Client, channel: TextChannel) {
		this.client = client;
		this.channel = channel;
	}

	/**
	 * Get a message
	 * @param {bigint} message Message ID
	 * @param {boolean} fetch Whether to fetch the message from the API
	 * @returns {Promise<Message>}
	 */
	async get(message: bigint, fetch = false) {
		const cache = this.client.cache.messages.get(this.channel.id, message);
		let data: Message;
		if (cache && !fetch) return cache;
		const discordData = (await this.client.rest
			.get(`/channels/${this.channel}/messages/${message}`)
			.catch(() => null)) as APIMessage;
		if (discordData) data = new Message(this.client, discordData);
		if (data) this.client.cache.messages.set(message, data);
		return data;
	}

	/**
	 * Fetches messages from the current channel
	 * @param {string} around - Get messages around this message ID
	 * @param {string} before - Get messages before this message ID
	 * @param {string} after - Get messages after this message ID
	 * @param {number} limit - Max number of messages to return (1-100)
	 * @returns {Promise<Array<Message>>}
	 */
	async fetch(
		limit?: number,
		around?: string,
		before?: string,
		after?: string,
	): Promise<Array<Message>> {
		const params = new URLSearchParams();
		if (around) params.append("around", around);
		if (before) params.append("before", before);
		if (after) params.append("after", after);
		if (limit) params.append("limit", limit.toString());

		const request = (await this.client.rest.get(
			`/channels/${this.channel.id}/messages`,
			{
				query: params,
			},
		)) as any;

		if (request?.code) {
			throw new APIError(request?.message);
		}

		const map = request.map((m) => new Message(this.client, m));

		map.forEach((m) => {
			this.client.cache.messages.set(m.id, m);
		});

		return map;
	}
}
