import { APIInteraction, ApplicationCommandType, ComponentType, InteractionType } from 'discord-api-types/v10';
import { Client, Guild, Member, User } from '../';

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
    constructor(client: Client, data: APIInteraction) {
        this.guild = client.cache.guilds.get(data.guild_id);
        this.client = client;
        this.id = data.id;
        this.applicationId = data.application_id;
        this.type = data.type;
        this.guildId = data.guild_id;
        this.token = data.token;
        if (data.user) data.member.user = data.user;
        if (data.member) this.member = new Member(client, data.member, this.guild);
        this.member?.setup();
        this.user = new User(client, data.user || this.member.user);
        this.channelId = data.channel_id;
        this.data = data.data;
        // @ts-ignore
        this.data.type = data.data.type;
        if (client.raw) this.raw = data;
        this.guildLocale = data.guild_locale;
        // @ts-ignore
        this.locale = data.locale;
        client.cache.users.set(this.user.id, this.user);
    }

    // those type checks were actually taken from d.js, thanks 👍

    /**
     * Indicates whether this interaction is a {@link CommandInteraction}.
     * @returns {boolean}
     */
    isCommand() {
        return this.type === InteractionType.ApplicationCommand;
    }

    /**
     * Indicates whether this interaction is a {@link ChatInputCommandInteraction}.
     * @returns {boolean}
     */
    isChatInputCommand() {
        return this.isCommand() && this.type === ApplicationCommandType.ChatInput;
    }

    /**
     * Indicates whether this interaction is a {@link ContextMenuCommandInteraction}
     * @returns {boolean}
     */
    isContextMenuCommand() {
        return this.isCommand() && [ApplicationCommandType.User, ApplicationCommandType.Message].includes(this.type);
    }

    /**
     * Indicates whether this interaction is a {@link UserContextMenuCommandInteraction}
     * @returns {boolean}
     */
    isUserContextMenuCommand() {
        return this.isContextMenuCommand() && this.type === ApplicationCommandType.User;
    }

    /**
     * Indicates whether this interaction is a {@link MessageContextMenuCommandInteraction}
     * @returns {boolean}
     */
    isMessageContextMenuCommand() {
        return this.isContextMenuCommand() && this.type === ApplicationCommandType.Message;
    }

    /**
     * Indicates whether this interaction is a {@link ModalSubmitInteraction}
     * @returns {boolean}
     */
    isModalSubmit() {
        return this.type === InteractionType.ModalSubmit;
    }

    /**
     * Indicates whether this interaction is an {@link AutocompleteInteraction}
     * @returns {boolean}
     */
    isAutocomplete() {
        return this.type === InteractionType.ApplicationCommandAutocomplete;
    }

    /**
     * Indicates whether this interaction is a {@link MessageComponentInteraction}.
     * @returns {boolean}
     */
    isMessageComponent() {
        return this.type === InteractionType.MessageComponent;
    }

    /**
     * Indicates whether this interaction is a {@link ButtonInteraction}.
     * @returns {boolean}
     */
    isButton() {
        return this.isMessageComponent() && this.data.type === ComponentType.Button;
    }

    /**
     * Indicates whether this interaction is a {@link SelectMenuInteraction}.
     * @returns {boolean}
     */
    isSelectMenu() {
        return this.isMessageComponent() && this.data.type === ComponentType.SelectMenu;
    }

    /**
     * Indicates whether this interaction can be replied to.
     * @returns {boolean}
     */
    isRepliable() {
        return ![InteractionType.Ping, InteractionType.ApplicationCommandAutocomplete].includes(this.type);
    }
}
