import { EventEmitter } from "ws";
import { REST } from "@discordjs/rest";
import { ClientOptions } from "../util/ClientOptions";
import { WebSocketManager } from "./Websocket";
export class Client extends EventEmitter {
    token: string;
    intents: number;
    ws: WebSocketManager;
    api: string
    rest: REST;
    constructor(options: ClientOptions) {
        super();
        this.token = options.token
        this.intents = options.intents
        this.api = options.api || "9"
        this.rest = new REST({
            api: 'https://discord.com/api', version: this.api
        })
        this.rest.setToken(this.token)
    }
    login() {
        console.log('login')
        this.ws = new WebSocketManager(this);
        this.ws.connect();
        this.ws.ws.on('open', () => {
            console.log('i am open')
            this.ws.identify();
        })
    }
}