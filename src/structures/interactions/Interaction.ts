import {
	type APIInteraction,
	ApplicationCommandType,
	ComponentType,
	InteractionType,
} from "discord-api-types/v10";
import { type Client, type Guild, Member, Permissions, User } from "../../";
// we cant import from ../../ because of circular dependency
import type { ButtonInteraction } from "./ButtonInteraction";
import type { ChatInputCommandInteraction } from "./ChatInputCommandInteraction";
import type { CommandInteraction } from "./CommandInteraction";
import type { MessageContextMenuInteraction } from "./MessageContextMenuInteraction";
import type { ModalInteraction } from "./ModalInteraction";
import type { RepliableInteraction } from "./RepliableInteraction";
import type { SelectMenuInteraction } from "./SelectMenuInteraction";
import type { UserContextMenuInteraction } from "./UserContextMenuInteraction";

/**
 * Interaction class
 *
 * @param {Client} client - Client instance
 * @param {APIInteraction} data - Interaction data
 * @class
 * @property {Client} client - Client instance
 * @property {bigint} id - Interaction ID
 * @property {string} type - Interaction type
 * @property {bigint} channelId - Channel ID
 * @property {bigint} applicationId - Application ID
 * @property {bigint} guildId - Guild ID
 * @property {string} token - Interaction token for replying
 * @property {Member} member - Member instance
 * @property {User} user - User who started the interaction
 * @property {APIInteraction} [raw] - Raw interaction data
 * @property {any} data - Interaction data (options, etc.)
 * @property {Guild} guild - Guild instance
 * @property {string} guildLocale - Guild locale
 */
export class Interaction {
	applicationId: bigint;
	type: number;
	guildId: bigint;
	id: bigint;
	token: string;
	user?: User;
	raw?: APIInteraction;
	data: any;
	channelId: bigint;
	guildLocale: string;
	locale: string;
	client: Client;
	member: Member;
	guild: Guild;
	appPermissions: Permissions;
	constructor(client: Client, data: APIInteraction) {
		this.appPermissions = new Permissions(BigInt(data.app_permissions || 0));
		if (data.guild_id)
			this.guild = client.cache.guilds.get(BigInt(data.guild_id));
		this.client = client;
		if (data.id) this.id = BigInt(data.id);
		if (data.application_id) this.applicationId = BigInt(data.application_id);
		this.type = data.type;
		if (data.guild_id) this.guildId = BigInt(data.guild_id);
		this.token = data.token;
		if (data.user && data.member) data.member.user = data.user;
		if (data.member) this.member = new Member(client, data.member, this.guild);
		this.user = new User(client, data.user || data.member.user);
		if (data.channel_id) this.channelId = BigInt(data.channel_id);
		this.data = data.data;
		if (client.raw) this.raw = data;
		this.guildLocale = data.guild_locale;
		// @ts-expect-error
		this.locale = data.locale;
		client.cache.users.set(this.user.id, this.user);
		if (this.guild) client.cache.members.set(this.guild.id, this.member);
		if (this.guild) client.cache.guilds.set(this.guild.id, this.guild);
	}

	/**
	 * Indicates whether this interaction is a {@link CommandInteraction}.
	 * @returns {boolean}
	 */
	isCommand(): this is CommandInteraction {
		return this.type === InteractionType.ApplicationCommand;
	}

	/**
	 * Indicates whether this interaction is a {@link ChatInputCommandInteraction}.
	 * @returns {boolean}
	 */
	isChatInputCommand(): this is ChatInputCommandInteraction {
		return (
			this.isCommand() && this.data.type === ApplicationCommandType.ChatInput
		);
	}

	/**
	 * Indicates whether this interaction is a context menu command.
	 * @returns {boolean}
	 */
	isContextMenuCommand(): this is
		| UserContextMenuInteraction
		| MessageContextMenuInteraction {
		return (
			this.isCommand() &&
			[ApplicationCommandType.User, ApplicationCommandType.Message].includes(
				this.data.type,
			)
		);
	}

	/**
	 * Indicates whether this interaction is a {@link UserContextMenuCommandInteraction}
	 * @returns {boolean}
	 */
	isUserContextMenuCommand(): this is UserContextMenuInteraction {
		return (
			this.isContextMenuCommand() &&
			this.data.type === ApplicationCommandType.User
		);
	}

	/**
	 * Indicates whether this interaction is a {@link MessageContextMenuInteraction}
	 * @returns {boolean}
	 */
	isMessageContextMenuCommand(): this is MessageContextMenuInteraction {
		return (
			this.isContextMenuCommand() &&
			this.data.type === ApplicationCommandType.Message
		);
	}

	/**
	 * Indicates whether this interaction is a modal submit interaction
	 * @returns {boolean}
	 */
	isModalSubmit(): this is ModalInteraction {
		return this.type === InteractionType.ModalSubmit;
	}

	/**
	 * Indicates whether this interaction is an autocomplete interaction
	 * @returns {boolean}
	 */
	isAutocomplete() {
		return this.type === InteractionType.ApplicationCommandAutocomplete;
	}

	/**
	 * Indicates whether this interaction is a {@link ButtonInteraction} or {@link SelectMenuInteraction}.
	 * @returns {boolean}
	 */
	isMessageComponent(): this is ButtonInteraction | SelectMenuInteraction {
		return this.type === InteractionType.MessageComponent;
	}

	/**
	 * Indicates whether this interaction is a {@link ButtonInteraction}.
	 * @returns {boolean}
	 */
	isButton(): this is ButtonInteraction {
		return (
			this.isMessageComponent() &&
			this.data.component_type === ComponentType.Button
		);
	}

	/**
	 * Indicates whether this interaction is a {@link SelectMenuInteraction}.
	 * @returns {boolean}
	 */
	isSelectMenu(): this is SelectMenuInteraction {
		return (
			this.isMessageComponent() &&
			this.data.component_type === ComponentType.SelectMenu
		);
	}

	/**
	 * Indicates whether this interaction's class extends {@link RepliableInteraction}.
	 * @returns {boolean}
	 */
	isRepliable(): this is RepliableInteraction {
		return ![
			InteractionType.Ping,
			InteractionType.ApplicationCommandAutocomplete,
		].includes(this.type);
	}
}
