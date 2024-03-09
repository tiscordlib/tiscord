import {
	Cache,
	type CacheOptions,
	type Channel,
	ChannelManager,
	type ClientOptions,
	ErrorCode,
	EventManager,
	FakeCache,
	FakeMap,
	type Guild,
	GuildManager,
	type Member,
	MessageCache,
	type Role,
	type ThreadMember,
	TiscordError,
	type User,
	UserManager,
	WebSocketManager,
} from "../";

import { EventEmitter } from "node:events";
import { arch, release, type } from "node:os";
import process from "node:process";
import {
	GatewayIntentBits,
	type GatewayPresenceUpdateData,
	type OAuth2Scopes,
	PermissionFlagsBits,
	PresenceUpdateStatus,
} from "discord-api-types/v10";
import { version } from "../../package.json";
import { ApplicationCommandManager } from "../managers/ApplicationCommandManager";
import { REST } from "../rest";
import { AllowedMentions, type RawMentions } from "../util/AllowedMentions";
import type { Events } from "../util/Events";
import type { PermissionType } from "../util/Permissions";

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
 *  @property {readyAt} readyAt - When the client was ready
 *  @property {uptime} uptime - Client uptime
 *  @property {ChannelManager} channels - Channel manager
 *  @property {WebSocketManager} ws - Websocket manager
 *  @property {string} api - The API version
 *  @property {CacheOptions} cacheOptions - Cache options
 *  @property {boolean} debugLogs - Whether to enable debug logs
 *  @property {User} user - The current user
 *  @property {GatewayPresenceUpdateData} presence - The current client presence
 *  @property {ApplicationCommandManager} applicationCommands - Application command manager
 *  @extends EventEmitter
 *  @class
 */
export class Client extends EventEmitter {
	token: string;
	intents: number;
	ws: WebSocketManager = new WebSocketManager(this);
	rest: REST;
	users: UserManager = new UserManager(this);
	guilds: GuildManager = new GuildManager(this);
	channels: ChannelManager = new ChannelManager(this);
	readyAt: Date;
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
	presence: Partial<GatewayPresenceUpdateData>;
	allowedMentions: RawMentions;
	applicationId: bigint;
	applicationCommands: ApplicationCommandManager =
		new ApplicationCommandManager(this);
	constructor(options: ClientOptions) {
		super();
		this.cacheOptions = options.cache;
		Object.defineProperty(this, "token", { value: options.token });

		if (typeof options.intents === "number") {
			this.intents = options.intents;
		} else {
			options.intents.forEach((intent) => {
				this.intents |= GatewayIntentBits[intent];
			});
		}

		this.raw = options.rawDataStorage;

		this.rest = new REST(
			this.token,
			{ version: 10 },
			{ logger: { debug: this.debug.bind(this) } },
		);

		this.debugLogs = options.debug;

		if (options.allowedMentions)
			this.allowedMentions = new AllowedMentions(options.allowedMentions);

		this.presence = {
			activities: [...(options.presence?.activities ?? [])],
			status: options.presence?.status ?? PresenceUpdateStatus.Online,
			since: options.presence?.since ?? null,
			afk: options.presence?.afk ?? false,
		};
		this.cache = {
			members: !this.cacheOptions?.members
				? new FakeCache()
				: new Cache<Member>(),
			guilds: !this.cacheOptions?.guilds
				? new FakeMap()
				: new Map<bigint, Guild>(),
			channels: !this.cacheOptions?.channels
				? new FakeMap()
				: new Map<bigint, Channel>(),
			users: !this.cacheOptions?.users
				? new FakeMap()
				: new Map<bigint, User>(),
			messages: !this.cacheOptions?.users
				? new FakeCache()
				: new MessageCache(options?.cache?.messageLimit),
			roles: !this.cacheOptions?.messages ? new FakeCache() : new Cache<Role>(),
			threadMembers: !this.cacheOptions?.messages
				? new FakeCache()
				: new Cache<ThreadMember>(),
		};

		this.debug(`OS Version: ${type()} ${release()} ${arch()}`);
		this.debug(`Node.js version: ${process.version}`);
		this.debug(`Tiscord version: ${version}`);
	}

	/**
	 * Log into discord
	 * @returns {void}
	 */
	login(): void {
		this.ws.connect();
		this.ws.connection.on("open", () => {
			this.ws.identify();
			this.readyAt = new Date();
		});
	}

	/**
	 * Client uptime
	 */
	get uptime(): number {
		if (!this.readyAt) throw new TiscordError(ErrorCode.Client_Not_Ready);
		return Date.now() - this.readyAt.getTime();
	}

	/**
	 * Whether the client is ready
	 */
	get isReady(): boolean {
		return this.readyAt !== undefined;
	}

	/**
	 * Ready timestamp
	 */
	get readyTimestamp(): number {
		if (!this.readyAt) throw new TiscordError(ErrorCode.Client_Not_Ready);
		return this.readyAt.getTime();
	}

	/**
	 * Generate invite url
	 */
	generateInvite(options: {
		permissions: PermissionType[];
		scopes: [keyof typeof OAuth2Scopes];
	}): string {
		const permissions = options.permissions.reduce(
			(a, b) => a | PermissionFlagsBits[b],
			0n,
		);
		const scopes = options.scopes.join(" ").toLowerCase();
		return `https://discord.com/api/oauth2/authorize?client_id=${this.user.id}&permissions=${permissions}&scope=${scopes}`;
	}

	/**
	 * Log debug information
	 * @param {string} message - The message to log
	 */
	debug(message: string[] | string, header?: string): void {
		if (Array.isArray(message)) message = message.join("");
		const dateObj = new Date();
		const date = `${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`;
		const newMessage = `[${date} ${header || "tiscord"}] ${message}`;
		if (this.debugLogs) this.debugLogs(newMessage);
	}

	/**
	 * Change the bot's presence
	 * @param options - The presence options
	 */
	setPresence(options: Partial<GatewayPresenceUpdateData>): void {
		this.ws.send({
			op: 3,
			d: {
				activities: [...options.activities],
				status: options.status ?? PresenceUpdateStatus.Online,
				afk: options.afk ?? false,
				since: options.since ?? null,
			},
		});
	}
}
