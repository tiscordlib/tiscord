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
    ws: WebSocket;
    sequence: any;
    intents: number;
    client: Client;
    sessionId: string;
    constructor(client: Client) {
        this.client = client;
        this.token = client.token;
        this.intents = client.intents;
    }

    /**
     * Connects to the websocket
     * @returns {void}
     */
    connect() {
        if (!this.intents) throw new GatewayError('Invalid intents');
        this.ws = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');
        this.ws.on('message', async (data: any) => {
            data = JSON.parse(data.toString());
            switch (data.op) {
                case 0:
                    this.sequence = data.s;
                    switch (data.t) {
                        case 'READY':
                            this.sessionId = data.d.session_id;
                            this.client.user = new User(this.client, data.d.user);
                            data.d.guilds.map(g => new Guild(this.client, g));
                            data.d.guilds.forEach(g => {
                                this.client.cache.guilds.set(g.id, g);
                            });
                            this.client.debug('Received ready event from gateway');
                            this.client.debug(
                                `Bot user: ${this.client.user.username}#${this.client.user.discriminator}`
                            );
                            this.client.debug(`Bot guild count: ${this.client.cache.guilds.size}`);
                            this.client._events = new EventManager().events;
                            this.client.emit('ready', this.client);
                            break;
                        default:
                            const event = this.client._events?.get(data.t);
                            if (event) {
                                await event(this.client, data);
                            }
                            break;
                    }
                    break;
                case 10:
                    setInterval(() => {
                        this.ws.send(JSON.stringify({ op: 1, d: this.sequence || null }));
                    }, data.d.heartbeat_interval);
                    break;
            }
        });
        this.ws.on('close', (code, message) => {
            if ([4004, 4011, 4012, 4013, 4014].includes(code)) {
                throw new GatewayError(message.toString());
            } else {
                this.client.debug(`Disconnected from gateway. Code: ${code}`);
                this.ws.close();
                this.connect();
                this.ws.on('open', () => {
                    this.ws.send(
                        JSON.stringify({
                            op: 6,
                            d: {
                                token: this.token,
                                session_id: this.sessionId,
                                seq: this.sequence
                            }
                        })
                    );
                });
            }
        });
    }

    /**
     * Logs into the gateway
     * @returns {void}
     */
    identify() {
        this.client.debug('Identifying with gateway.');
        this.client.debug(`Intents: ${this.intents}`);
        this.ws.send(
            JSON.stringify({
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
            })
        );
    }
}
