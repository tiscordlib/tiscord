import {
	Attachment,
	type Client,
	type Guild,
	Member,
	Role,
	User,
	channelType,
} from "../";

import {
	ApplicationCommandOptionType,
	ChannelType,
} from "discord-api-types/v10";

/**
 * A class for parsing interaction options.
 * @param {Client} client - Client instance
 * @param {any[]} options - Options data
 * @param {Object} resolved - Resolved options data
 * @param {Guild} guild - Guild instance, if present.
 * @class
 * @property {Object} options - Parsed options data
 * @property {Object} resolved - Resolved options data
 */
export class InteractionOptions {
	options: Map<string, any>;
	resolved: Record<string, Record<string, any>>;
	client: Client;
	guild: Guild;
	subcommandGroup?: string;
	subcommand?: string;
	constructor(
		client: Client,
		options: any[],
		resolved: Record<string, Record<string, any>>,
		guild?: Guild,
	) {
		this.options = new Map();
		this.client = client;
		this.guild = guild;
		this.resolved = resolved;
		if (
			options &&
			options[0]?.type === ApplicationCommandOptionType.SubcommandGroup
		) {
			this.subcommandGroup = options[0].name;
			[{ options }] = options;
		}
		if (
			options &&
			options[0]?.type === ApplicationCommandOptionType.Subcommand
		) {
			this.subcommand = options[0].name;
			[{ options }] = options;
		}
		options?.forEach((option) => {
			this.options.set(option.name, option);
		});
	}

	/**
	 * Get the value of a string option
	 * @param {string} name - Name of the option to get
	 * @returns {string}
	 */
	getString(name: string): string {
		const option = this.options.get(name);
		if (!option) return null;
		if (option.type !== ApplicationCommandOptionType.String)
			throw new TypeError(`Option '${name}' is not a string`);
		return option.value;
	}

	/**
	 * Get the value of a number option
	 * @param {string} name - Name of the option to get
	 * @returns {number}
	 */
	getNumber(name: string): number {
		const option = this.options.get(name);
		if (!option) return null;
		if (option.type !== ApplicationCommandOptionType.Number)
			throw new TypeError(`Option '${name}' is not a number`);
		return option.value;
	}

	/**
	 * Get the value of a boolean option
	 * @param name - Name of the option to get
	 * @returns {boolean}
	 */
	getBoolean(name: string): boolean {
		const option = this.options.get(name);
		if (!option) return null;
		if (option.type !== ApplicationCommandOptionType.Boolean)
			throw new TypeError(`Option '${name}' is not a boolean`);
		return option.value;
	}

	/**
	 * Get the value of a user option
	 * @param name - Name of the option to get
	 * @returns {User}
	 */
	getUser(name: string): User {
		const option = this.options.get(name);
		if (!option) return null;
		if (
			option.type === ApplicationCommandOptionType.User ||
			option.type === ApplicationCommandOptionType.Mentionable
		)
			throw new TypeError(`Option '${name}' is not a user`);
		return new User(this.client, this.resolved.users[option.value]);
	}

	/**
	 * Get the value of a user option as a member
	 * @param {string} name - Name of the option to get
	 * @returns {Member}
	 */
	getMember(name: string): Member {
		const option = this.options.get(name);
		if (!option) return null;
		if (
			option.type === ApplicationCommandOptionType.User &&
			option.type !== ApplicationCommandOptionType.Mentionable
		)
			throw new TypeError(`Option '${name}' is not a user`);
		if (!this.guild) return null;
		return new Member(
			this.client,
			this.resolved.members[option.value],
			this.guild,
		);
	}

	/**
	 * Get the value of a channel option
	 * @param name - Name of the option to get
	 * @returns {Channel}
	 */
	getChannel(name: string) {
		const option = this.options.get(name);
		if (!option) return null;
		if (option.type !== ApplicationCommandOptionType.Channel)
			throw new TypeError(`Option '${name}' is not a channel`);
		const channelData = this.resolved.channels[option.value];
		const channel = channelType(this.client, channelData);
		// @ts-expect-error
		if (channel.type === ChannelType.DM) channel?.guilds();
		return channel;
	}

	/**
	 * Get the value of a role option
	 * @param name - Name of the option to get
	 * @returns {Role}
	 */
	getRole(name: string): Role {
		const option = this.options.get(name);
		if (!option) return null;
		if (
			option.type !== ApplicationCommandOptionType.Role &&
			option.type !== ApplicationCommandOptionType.Mentionable
		)
			throw new TypeError(`Option '${name}' is not a role`);
		return new Role(this.client, this.resolved.roles[option.value]);
	}

	/**
	 * Get the value of a attachment option
	 * @param name - Name of the option to get
	 * @returns {Attachment}
	 */
	getAttachment(name: string): Attachment {
		const option = this.options.get(name);
		if (!option) return null;
		if (option.type !== ApplicationCommandOptionType.Attachment)
			throw new TypeError(`Option '${name}' is not an attachment`);
		return new Attachment(this.resolved.attachments[option.value]);
	}

	/**
	 * Get the value of a integer option
	 * @param name - Name of the option to get
	 * @returns {number}
	 */
	getInteger(name: string): number {
		const option = this.options.get(name);
		if (!option) return null;
		if (option.type !== ApplicationCommandOptionType.Integer)
			throw new TypeError(`Option '${name}' is not an integer`);
		return option.value;
	}
}
