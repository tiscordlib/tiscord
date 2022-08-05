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
    MessageCache,
    Role,
    ThreadMember,
    User,
    UserManager,
    WebSocketManager
} from '../';

import process from 'node:process';
import { arch, release, type } from 'node:os';
import { EventEmitter } from 'node:events';
import { GatewayIntentBits, GatewayPresenceUpdateData } from 'discord-api-types/v10';
import { REST } from '../rest/REST';
// @ts-expect-error
import { version } from '../../package.json';
import { Events } from '../util/Events';
import { AllowedMentions, RawMentions } from '../util/AllowedMentions';

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
 *  @property {User} user - The current user
 *  @property {GatewayPresenceUpdateData} presence - The current client presence
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
    on: (<K extends keyof Events>(s: K, listener: Events[K]) => this) &
        ((s: string, listener: (...args: any[]) => void) => this);
    cache: {
        members: Cache<Member> | FakeCache;
        guilds: Map<bigint, Guild> | FakeMap<Guild>;
        channels: Map<bigint, Channel>;
        users: Map<bigint, User>;
        messages: MessageCache | FakeCache;
        roles: Cache<Role> | FakeCache;
        threadMembers: Cache<ThreadMember> | FakeCache;
    };
    _wsEvents: EventManager = new EventManager();
    raw: boolean;
    cacheOptions: CacheOptions;
    debugLogs: typeof console.log;
    presence: GatewayPresenceUpdateData;
    allowedMentions: RawMentions;
    constructor(options: ClientOptions) {
        super();
        this.cacheOptions = options.cache;
        Object.defineProperty(this, 'token', { value: options.token });
        if (typeof options.intents === 'number') {
            this.intents = options.intents;
        } else {
            options.intents.forEach(intent => {
                this.intents |= GatewayIntentBits[intent];
            });
        }
        this.raw = options.rawDataStorage;
        this.apiVersion = options.api || 10;
        this.rest = new REST();
        this.rest.token(this.token);
        this.users = new UserManager(this);
        this.guilds = new GuildManager(this);
        this.channels = new ChannelManager(this);
        this.debugLogs = options.debug;
        if (options.allowedMentions) this.allowedMentions = new AllowedMentions(options.allowedMentions);
        this.presence = options.presence;
        this.cache = {
            members: this.cacheOptions?.members === false ? new FakeCache() : new Cache<Member>(),
            guilds: this.cacheOptions?.guilds === false ? new FakeMap() : new Map<bigint, Guild>(),
            channels: this.cacheOptions?.channels === false ? new FakeMap() : new Map<bigint, Channel>(),
            users: this.cacheOptions?.users === false ? new FakeMap() : new Map<bigint, User>(),
            messages: this.cacheOptions?.users === false ? new FakeCache() : new MessageCache(this),
            roles: this.cacheOptions?.messages === false ? new FakeCache() : new Cache<Role>(),
            threadMembers: this.cacheOptions?.messages === false ? new FakeCache() : new Cache<ThreadMember>()
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
    debug(message: string[] | string, header?: string): void {
        if (message instanceof Array) message = message.join('');
        const dateObj = new Date();
        const date = `${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`;
        const newMessage = `[${date} ${header || 'tiscord'}] ${message}`;
        if (this.debugLogs) this.debugLogs(newMessage);
    }

    /**
     * Change the bot's presence
     * @param options - The presence options
     */
    setPresence(options: GatewayPresenceUpdateData): void {
        this.ws.send({ op: 3, d: options });
    }
}
