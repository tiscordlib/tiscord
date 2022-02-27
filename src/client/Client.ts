import {
    ClientOptions,
    GuildManager,
    UserManager,
    WebSocketManager,
    ChannelManager,
    Guild,
    Channel,
    User,
    Cache
} from '../';

import { EventEmitter } from 'node:events';
import { REST } from '@discordjs/rest';

export class Client extends EventEmitter {
    token: string;
    intents: number;
    ws: WebSocketManager;
    api: string;
    rest: REST;
    users: UserManager;
    guilds: GuildManager;
    channels: ChannelManager;
    cache: {
        members: Cache;
        guilds: Map<string, Guild>;
        channels: Map<string, Channel>;
        users: Map<string, User>;
        messages: Cache;
        roles: Cache;
    };
    raw: boolean;
    constructor(options: ClientOptions) {
        super();
        this.token = options.token;
        this.intents = options.intents;
        this.raw = options.rawDataStorage;
        this.api = options.api || '1';
        this.rest = new REST({
            api: 'https://discord.com/api',
            version: this.api
        });
        this.rest.setToken(this.token);
        this.users = new UserManager(this);
        this.guilds = new GuildManager(this);
        this.channels = new ChannelManager(this);
        this.cache = {
            members: new Cache(),
            guilds: new Map(),
            channels: new Map(),
            users: new Map(),
            messages: new Cache(),
            roles: new Cache()
        };
    }
    login() {
        this.ws = new WebSocketManager(this);
        this.ws.connect();
        this.ws.ws.on('open', () => {
            this.ws.identify();
        });
    }
}
