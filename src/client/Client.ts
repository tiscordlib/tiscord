import {
    ClientOptions,
    GuildManager,
    UserManager,
    WebSocketManager,
    ChannelManager,
    Guild,
    Channel,
    User,
    Cache,
    Sweeper
} from '../';

import { EventEmitter } from 'node:events';
import { REST } from '@discordjs/rest';

/**
 *  The main client class
 *  @param {ClientOptions} options - Client options
 *  @property {string} token - Bot token
 *  @property {number} intents - Gateway intents
 *  @property {REST} rest - The REST client
 *  @property {object} cache - The cache object
 *  @property {Sweeper} sweeper - Cache sweeper
 *  @property {GuildManager} guilds - Guild manager
 *  @property {UserManager} users - User manager
 *  @property {ChannelManager} channels - Channel manager
 *  @property {WebSocketManager} ws - Websocket manager
 * @property {string} api - The API version
 * @property {}
 *  @extends EventEmitter
 *  @class
 */
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
    messageTtl: number;
    sweepInterval: number;
    sweeper: Sweeper;
    constructor(options: ClientOptions) {
        super();
        this.token = options.token;
        this.intents = options.intents;
        this.raw = options.rawDataStorage;
        this.api = options.api || '1';
        this.messageTtl = options.messageLifetime || 100;
        this.sweepInterval = options.sweepInterval || 100;
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
        this.sweeper = new Sweeper(this);
        setInterval(() => {
            this.sweeper.sweep();
        }, this.sweepInterval);
    }

    /**
     * Log into discord
     * @returns {void}
     */
    login(): void {
        this.ws = new WebSocketManager(this);
        this.ws.connect();
        this.ws.ws.on('open', () => {
            this.ws.identify();
        });
    }
}
