import { Client, EventManager, GatewayError, Guild, User } from '../';

import WebSocket from 'ws';

/**
 *  Main websocket class.
 *  @param {Client} client - Client instance
 *  @property {Client} client - Client instance
 *  @property {string} token - Client token
 *  @property {number} intents - Client intents
 *  @property {string} sessionId - Client session id
 *  @class
 */
export class WebSocketManager {
    token: string;
    connection: WebSocket;
    sequence: any;
    intents: number;
    client: Client;
    sessionId: string;
    erlpack: any;
    constructor(client: Client) {
        this.client = client;
        this.token = client.token;
        this.intents = client.intents;
        try {
            this.erlpack = require('erlpack');
        } catch {
        }
    }

    /**
     * Connects to the websocket
     * @returns {void}
     */
    connect() {
        if (!this.intents) throw new GatewayError('Invalid intents');
        const url = this.getGateway(this.client.apiVersion, this.erlpack);
        this.connection = new WebSocket(url);
        this.connection.on('message', async (data: any) => {
            data = this.get(data);
            switch (data.op) {
                case 0:
                    this.sequence = data.s;
                    const event = this.client._wsEvents?.list.get(data.t);
                    if (event) {
                        await event(this.client, data);
                    }
                    break;

                case 10:
                    setInterval(() => {
                        this.send({ op: 1, d: this.sequence || null });
                    }, data.d.heartbeat_interval);
                    break;
            }
        });
        this.connection.on('close', (code, message) => {
            if ([4004, 4011, 4012, 4013, 4014].includes(code)) {
                throw new GatewayError(message.toString());
            }
            this.client.debug(`Disconnected from gateway. Code: ${code}`);
            this.connection.close();
            this.connect();
            this.connection.on('open', () => {
                this.send({
                    op: 6,
                    d: {
                        token: this.token,
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
        this.client.debug('Identifying with gateway.');
        this.client.debug(`Intents: ${this.intents}`);
        this.send({
            op: 2,
            d: {
                token: this.token,
                intents: this.intents,
                properties: {
                    $os: 'linux',
                    $browser: 'tiscord',
                    $device: 'tiscord'
                }
            }
        }
        );
    }
    /**
     * Send data to send to the websocket
     * @param data - data to send
     */
    send(data: any) {
        if (this.erlpack) data = this.erlpack.pack(data);
        else data = JSON.stringify(data);
        this.connection.send(data)
    }

    /**
     * Parse data from the websocket
     * @param {any} data - Data to parse
     */
    get(data: any) {
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
    getGateway(api: string, etf: boolean) {
        return `wss://gateway.discord.gg/?v=${api}&encoding=${etf ? 'etf' : 'json'}`;
    }
}
