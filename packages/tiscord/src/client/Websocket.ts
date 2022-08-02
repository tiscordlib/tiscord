import { Client, GatewayError } from '../';

import process from 'node:process';
import WebSocket from 'ws';

/**
 *  Main websocket class.
 *  @param {Client} client - Client instance
 *  @property {Client} client - Client instance
 *  @property {string} sessionId - Client session id
 *  @class
 */
export class WebSocketManager {
    connection: WebSocket;
    sequence: any;
    client: Client;
    sessionId: string;
    erlpack: any;
    lastHeartbeat = 0;
    lastHeartbeatAck = 0;
    ping = 0;
    interval: NodeJS.Timer;
    constructor(client: Client) {
        this.client = client;
        try {
            this.erlpack = require('erlpack');
            // eslint-disable-next-line no-empty
        } catch {}
    }

    /**
     * Connects to the websocket
     * @returns {void}
     */
    connect() {
        if (this.client.intents === undefined) throw new GatewayError('Invalid intents');
        const url = this.getGateway(this.client.apiVersion, this.erlpack);
        this.connection = new WebSocket(url);
        this.connection.on('message', async (data: any) => {
            data = this.parse(data);
            switch (data.op) {
                case 0:
                    this.sequence = data.s;
                    this.client.debug(`Received ${data.t} event`, 'gateway');
                    const event = this.client._wsEvents?.list.get(data.t);
                    if (event) {
                        await event(this.client, data);
                    }
                    break;

                case 10:
                    if (this.interval) clearInterval(this.interval);
                    this.interval = setInterval(() => {
                        if (this.lastHeartbeatAck < this.lastHeartbeat) {
                            this.client.debug('Heartbeat timed out.', 'gateway');
                            this.connect();
                            this.connection.on('open', () => {
                                this.resume();
                            });
                        } else {
                            this.send({ op: 1, d: this.sequence || null });
                            this.ping = this.lastHeartbeatAck - this.lastHeartbeat;
                            this.lastHeartbeat = Date.now();
                        }
                    }, data.d.heartbeat_interval * Math.random());
                    break;
                case 11:
                    this.lastHeartbeatAck = Date.now();
                    break;
            }
        });
        this.connection.on('close', (code, message) => {
            if ([4004, 4011, 4012, 4013, 4014].includes(code)) {
                throw new GatewayError(message.toString());
            }
            this.client.debug(`Disconnected from gateway. Code: ${code}`, 'gateway');
            this.connection.close();
            this.connect();
            this.connection.on('open', () => {
                this.send({
                    op: 6,
                    d: {
                        token: this.client.token,
                        session_id: this.sessionId,
                        seq: this.sequence
                    }
                });
            });
        });
    }

    /**
     * Logs into the gateway
     * @returns {void}
     */
    identify() {
        this.client.debug('Identifying with gateway.', 'gateway');
        this.client.debug(`Intents: ${this.client.intents}`, 'gateway');
        const data: any = {
            token: this.client.token,
            intents: this.client.intents,
            properties: {
                os: process.platform,
                browser: 'tiscord',
                device: 'tiscord'
            }
        };
        if (this.client.presence) data.presence = this.client.presence;
        this.send({
            op: 2,
            d: data
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
                seq: this.sequence
            }
        });
    }

    /**
     * Send data to send to the websocket
     * @param data - data to send
     */
    send(data: any) {
        if (this.erlpack) data = this.erlpack.pack(data);
        else data = JSON.stringify(data);
        this.connection.send(data);
    }

    /**
     * Parse data from the websocket
     * @param {Object} data - Data to parse
     */
    parse(data: any): Record<string, any> {
        if (this.erlpack) data = this.erlpack.unpack(data);
        else data = JSON.parse(data);
        return data;
    }

    /**
     * Get gateway URL
     * @param {string} api - Api version
     * @param {boolean} etf - whether to use erlpack
     * @returns {string}
     */
    getGateway(api: number, etf: boolean) {
        return `wss://gateway.discord.gg/?v=${api}&encoding=${etf ? 'etf' : 'json'}`;
    }
}
