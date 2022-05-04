import {
    Cache,
    CacheOptions,
    Channel,
    ChannelManager,
    ClientOptions,
    EventManager,
    FakeCache,
    FakeMap,
    Guild,
    GuildManager,
    Member,
    Message,
    MessageCache,
    Role,
    ThreadMember,
    User,
    UserManager,
    WebSocketManager
} from '../';

import { arch, release, type } from 'os';
import { EventEmitter } from 'events';
import { GatewayIntentBits } from 'discord-api-types/v10';
import { REST } from './REST';
// @ts-ignore
import { version } from '../../package.json';

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
 *  @property {string} api - The API version
 *  @property {CacheOptions} cacheOptions - Cache options
 *  @property {boolean} debugLogs - Whether to enable debug logs
 * @property {User} user - The current user
 *  @extends EventEmitter
 *  @class
 */
export class Client extends EventEmitter {
    token: string;
    intents: number;
    ws: WebSocketManager;
    apiVersion: number;
    rest: REST;
    users: UserManager;
    guilds: GuildManager;
    channels: ChannelManager;
    user: User;
    cache: {
        members: Cache<Member> | FakeCache;
        guilds: Map<string, Guild> | FakeMap;
        channels: Map<string, Channel>;
        users: Map<string, User>;
        messages: Cache<Message> | FakeCache;
        roles: Cache<Role> | FakeCache;
        threadMembers: Cache<ThreadMember> | FakeCache;
    };
    _wsEvents: EventManager = new EventManager();
    raw: boolean;
    cacheOptions: CacheOptions;
    debugLogs: boolean;
    constructor(options: ClientOptions) {
        super();
        this.cacheOptions = options.cache;
        this.token = options.token;
        if (typeof options.intents === 'number') {
            this.intents = options.intents;
        } else {
            options.intents.forEach(intent => {
                this.intents |= GatewayIntentBits[intent];
            });
        }
        this.raw = options.rawDataStorage;
        this.apiVersion = options.api || 10;
        this.rest = new REST({
            baseURL: 'https://discord.com/api',
            version: this.apiVersion,
            auth: `Bot ${this.token}`
        });
        this.users = new UserManager(this);
        this.guilds = new GuildManager(this);
        this.channels = new ChannelManager(this);
        this.debugLogs = options.debug;
        this.cache = {
            members: this.cacheOptions?.members === false ? new FakeCache() : new Cache(),
            guilds: this.cacheOptions?.guilds === false ? new FakeMap() : new Map(),
            channels: this.cacheOptions?.channels === false ? new FakeMap() : new Map(),
            users: this.cacheOptions?.users === false ? new FakeMap() : new Map(),
            messages: this.cacheOptions?.users === false ? new FakeCache() : new MessageCache(this),
            roles: this.cacheOptions?.messages === false ? new FakeCache() : new Cache(),
            threadMembers: this.cacheOptions?.messages === false ? new FakeCache() : new Cache()
        };
        this.debug(`OS Version: ${type()} ${release()} ${arch()}`);
        this.debug(`Node.js version: ${process.version}`);
        this.debug(`Tiscord version: ${version}`);
        this.debug(`API version: ${this.apiVersion}`);
    }

    /**
     * Log into discord
     * @returns {void}
     */
    login(): void {
        this.ws = new WebSocketManager(this);
        this.ws.connect();
        this.ws.connection.on('open', () => {
            this.ws.identify();
        });
    }

    /**
     * Log debug information
     * @param {string} message - The message to log
     */
    debug(message: string): void {
        const dateObj = new Date();
        const date = `${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`;
        message = `[${date} tiscord] ${message}`;
        if (this.debugLogs) {
            console.log(message);
        }
    }
}
