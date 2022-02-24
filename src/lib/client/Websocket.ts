import { Message } from '../structures/Message';
import WebSocket from 'ws';
import { Client } from './Client';

export class WebSocketManager {
    token: string;
    ws: WebSocket;
    sequence: any;
    intents: number;
    client: Client;
    constructor(client: Client) {
        this.client = client;
        this.token = client.token;
        this.intents = client.intents;
    }
    connect() {
        this.ws = new WebSocket('wss://gateway.discord.gg/?v=9&encoding=json');
        this.ws.on('message', (data: any) => {
            data = JSON.parse(data.toString());
            switch (data.op) {
                case 0:
                    switch (data.t) {
                        case 'READY':
                            this.client.emit('ready', this.client);
                            break;
                        case 'MESSAGE_CREATE':
                            data.d.client = this.client;
                            this.client.emit('message', new Message(data.d));
                            break;
                    }
                    break;
                case 10:
                    setInterval(() => {
                        this.ws.send(JSON.stringify({ op: 1 }));
                    }, data.d.heartbeat_interval);
                    break;
            }
        });
    }
    identify() {
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
