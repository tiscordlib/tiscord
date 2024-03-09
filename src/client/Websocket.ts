import process from "node:process";
import { GatewayOpcodes } from "discord-api-types/v10";
import WebSocket from "ws";
import { type Client, ErrorCode, TiscordError } from "../";

/**
 *  Main websocket class.
 *  @param {Client} client - Client instance
 *  @property {Client} client - Client instance
 *  @property {string} sessionId - Client session id
 *  @class
 */
export class WebSocketManager {
	connection: WebSocket;
	sequence: number;
	client: Client;
	sessionId: string;
	lastHeartbeat = 0;
	lastHeartbeatAck = 0;
	ping = 0;
	interval: NodeJS.Timer;
	connected: boolean;
	resumeGatewayUrl: string;
	constructor(client: Client) {
		this.client = client;
	}

	/**
	 * Connects to the websocket
	 * @returns {void}
	 */
	connect() {
		if (this.client.intents === undefined)
			throw new TiscordError(ErrorCode.Invalid_Intents);
		this.client.rest
			.get("/users/@me")
			.then(() => {
				this.client.debug("Checking if token is valid.", "gateway");
			})
			.catch(() => {
				throw new TiscordError(ErrorCode.Invalid_Token);
			});
		const url = this.getGateway();
		this.connection = new WebSocket(url);
		this.connected = true;
		this.connection.on("message", async (data: any) => {
			data = JSON.parse(data);
			switch (data.op) {
				case GatewayOpcodes.Hello:
					// @ts-expect-error
					if (this.interval) clearInterval(this.interval);
					setTimeout(() => {
						this.send({ op: 1, d: this.sequence || null });
						this.lastHeartbeat = Date.now();

						this.interval = setInterval(() => {
							if (
								this.lastHeartbeat &&
								this.lastHeartbeatAck &&
								this.lastHeartbeatAck < this.lastHeartbeat
							) {
								this.client.debug("Heartbeat timed out.", "gateway");
								this.connect();
								this.connection.on("open", () => {
									this.resume();
								});
							} else {
								this.send({ op: 1, d: this.sequence || null });
								this.ping = this.lastHeartbeatAck - this.lastHeartbeat;
								this.lastHeartbeat = Date.now();
							}
						}, data.d.heartbeat_interval);
					}, data.d.heartbeat_interval * Math.random());
					break;
				case GatewayOpcodes.HeartbeatAck:
					this.lastHeartbeatAck = Date.now();
					break;
				case GatewayOpcodes.Dispatch:
					{
						this.sequence = data.s;
						this.client.debug(`Received ${data.t} event`, "gateway");
						const event = this.client._wsEvents?.list.get(data.t);
						if (event) {
							await event(this.client, data);
						}
					}
					break;
			}
		});
	}

	/**
	 * Request guild members
	 * @param {Object} data - Request data
	 * @param {bigint} data.guildId - Guild id
	 * @param {string} [data.query] - Query to search for
	 * @param {number} [data.limit] - Limit to search for
	 * @returns {void}
	 */

	requestGuildMembers(data: {
		guildId: bigint;
		query?: string;
		limit?: number;
	}): void {
		this.client.ws.send({
			op: 8,
			d: {
				guild_id: data.guildId.toString(),
				query: data.query ?? "",
				limit: data.limit ?? 0,
			},
		});
	}

	/**
	 * Logs into the gateway
	 * @returns {void}
	 */
	identify(): void {
		this.client.debug("Identifying with gateway.", "gateway");
		this.client.debug(`Intents: ${this.client.intents}`, "gateway");
		const data: any = {
			token: this.client.token,
			intents: this.client.intents,
			properties: {
				os: process.platform,
				browser: "tiscord",
				device: "tiscord",
			},
		};
		if (this.client.presence) data.presence = this.client.presence;
		this.send({
			op: 2,
			d: data,
		});
	}

	/**
	 * Resume the connection
	 */
	resume() {
		this.send({
			op: 6,
			d: {
				token: this.client.token,
				session_id: this.sessionId,
				seq: this.sequence,
			},
		});
	}

	/**
	 * Send data to send to the websocket
	 * @param data - data to send
	 */
	send(data: any) {
		this.connection.send(JSON.stringify(data));
	}

	/**
	 * Get gateway URL
	 * @returns {string}
	 */
	getGateway(): string {
		return `${
			this.connected ? this.resumeGatewayUrl : "wss://gateway.discord.gg/"
		}?v=10&encoding=json`;
	}
}
