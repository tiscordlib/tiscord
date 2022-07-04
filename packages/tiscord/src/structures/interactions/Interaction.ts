import { APIInteraction, ApplicationCommandType, ComponentType, InteractionType } from 'discord-api-types/v10';
import { Client, Guild, Member, User, Permissions } from '../../';
// we cant import from ../../ because of circular dependency
import { ButtonInteraction } from './ButtonInteraction';
import { CommandInteraction } from './CommandInteraction';
import { RepliableInteraction } from './RepliableInteraction';
import { SelectMenuInteraction } from './SelectMenuInteraction';
import { ChatInputCommandInteraction } from './ChatInputCommandInteraction';
import { UserContextMenuInteraction } from './UserContextMenuInteraction';
import { MessageContextMenuInteraction } from './MessageContextMenuInteraction';
import { ModalInteraction } from './ModalInteraction';

/**
 * Interaction class
 *
 * @param {Client} client - Client instance
 * @param {APIInteraction} data - Interaction data
 * @class
 * @property {Client} client - Client instance
 * @property {string} id - Interaction ID
 * @property {string} type - Interaction type
 * @property {string} channelId - Channel ID
 * @property {string} applicationId - Application ID
 * @property {string} guildId - Guild ID
 * @property {string} token - Interaction token for replying
 * @property {Member} member - Member instance
 * @property {User} user - User who started the interaction
 * @property {APIInteraction} [raw] - Raw interaction data
 * @property {any} data - Interaction data (options, etc.)
 * @property {Guild} guild - Guild instance
 * @property {string} guildLocale - Guild locale
 */
export class Interaction {
    applicationId: string;
    type: number;
    guildId: string;
    id: string;
    token: string;
    user?: User;
    raw?: APIInteraction;
    data: any;
    channelId: string;
    guildLocale: string;
    locale: string;
    client: Client;
    member: Member;
    guild: Guild;
    appPermissions: Permissions;
    constructor(client: Client, data: APIInteraction) {
        this.appPermissions = new Permissions(BigInt(data.app_permissions || 0));
        this.guild = client.cache.guilds.get(data.guild_id);
        this.client = client;
        this.id = data.id;
        this.applicationId = data.application_id;
        this.type = data.type;
        this.guildId = data.guild_id;
        this.token = data.token;
        if (data.user && data.member) data.member.user = data.user;
        if (data.member) this.member = new Member(client, data.member, this.guild);
        this.member?.setup();
        this.user = new User(client, data.user || this.member.user);
        this.channelId = data.channel_id;
        this.data = data.data;
        if (client.raw) this.raw = data;
        this.guildLocale = data.guild_locale;
        // @ts-expect-error
        this.locale = data.locale;
        client.cache.users.set(this.user.id, this.user);
        if (this.guild) client.cache.members.set(this.guild?.id, this.member);
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
        return this.isCommand() && this.data.type === ApplicationCommandType.ChatInput;
    }

    /**
     * Indicates whether this interaction is a context menu command.
     * @returns {boolean}
     */
    isContextMenuCommand(): this is UserContextMenuInteraction | MessageContextMenuInteraction {
        return (
            this.isCommand() && [ApplicationCommandType.User, ApplicationCommandType.Message].includes(this.data.type)
        );
    }

    /**
     * Indicates whether this interaction is a {@link UserContextMenuCommandInteraction}
     * @returns {boolean}
     */
    isUserContextMenuCommand(): this is UserContextMenuInteraction {
        return this.isContextMenuCommand() && this.data.type === ApplicationCommandType.User;
    }

    /**
     * Indicates whether this interaction is a {@link MessageContextMenuInteraction}
     * @returns {boolean}
     */
    isMessageContextMenuCommand(): this is MessageContextMenuInteraction {
        return this.isContextMenuCommand() && this.data.type === ApplicationCommandType.Message;
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
        return this.isMessageComponent() && this.data.component_type === ComponentType.Button;
    }

    /**
     * Indicates whether this interaction is a {@link SelectMenuInteraction}.
     * @returns {boolean}
     */
    isSelectMenu(): this is SelectMenuInteraction {
        return this.isMessageComponent() && this.data.component_type === ComponentType.SelectMenu;
    }

    /**
     * Indicates whether this interaction's class extends {@link RepliableInteraction}.
     * @returns {boolean}
     */
    isRepliable(): this is RepliableInteraction {
        return ![InteractionType.Ping, InteractionType.ApplicationCommandAutocomplete].includes(this.type);
    }
}
