import { Message } from '../structures/Message';
import WebSocket from 'ws'
import { Client } from './Client';

export class WebSocketManager {
    token: String;
    ws: WebSocket;
    sequence: any;
    intents: Number;
    client: Client;
    constructor(client: Client) {
        this.client = client
        this.token = client.token
        this.intents = client.intents
    }
    connect() {
        this.ws = new WebSocket('wss://gateway.discord.gg/?v=9&encoding=json')
        this.ws.on('message', (data: any) => {
            data = JSON.parse(data.toString())
            if (data.op === 10) {
                setInterval(() => {
                    this.ws.send(JSON.stringify({ "op": 1 }))
                }, data.d.heartbeat_interval)
            }
            if (data.op === 0) {
                if (data.t === "MESSAGE_CREATE") {
                    data.d.client = this.client
                    this.client.emit('message', new Message(data.d))
                }
            }
        })
    }
    identify() {
        this.ws.send(JSON.stringify({
            "op": 2,
            "d": {
                "token": this.token,
                "intents": this.intents,
                "properties": {
                    "$os": "linux",
                    "$browser": "tiscord",
                    "$device": "tiscord"
                }
            }
        }), (err) => console.log(err)
        )
        console.log('ALright')
    }
}