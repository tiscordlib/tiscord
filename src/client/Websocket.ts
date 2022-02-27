import WebSocket from 'ws';
import { CommandInteraction, Interaction, Client, Message } from '../';

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
        this.ws = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');
        this.ws.on('message', async (data: any) => {
            data = JSON.parse(data.toString());
            switch (data.op) {
                case 0:
                    this.sequence = data.s;
                    switch (data.t) {
                        case 'READY':
                            this.client.emit('ready', this.client);
                            break;
                        case 'MESSAGE_CREATE':
                            const message = new Message(this.client, data.d);
                            await message.guilds();
                            this.client.emit('message', message);
                            break;
                        case 'INTERACTION_CREATE':
                            if (data.d.type === 2) {
                                this.client.emit('interaction', new CommandInteraction(this.client, data.d));
                            } else {
                                this.client.emit('interaction', new Interaction(this.client, data.d));
                            }
                    }
                    break;
                case 10:
                    setInterval(() => {
                        this.ws.send(JSON.stringify({ op: 1, d: this.sequence || null }));
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
