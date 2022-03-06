/* eslint-disable require-atomic-updates */
/* eslint-disable camelcase */
import { APIInteraction, APIMessage, APIMessageReference, MessageFlags } from 'discord-api-types/v10';
import {
    APIError,
    Client,
    Guild,
    MessageOptions,
    MessageTypes,
    SystemMessageTypes,
    TextChannel,
    User,
    Interaction,
    ThreadChannel
} from '../';

/**
 * Message class
 * @param {Client} client - Client instance
 * @param {APIMessage} data - Message data
 * @class
 * @property {string} id - Message ID
 * @property {string} channelId - Channel ID
 * @property {User} author - Author user object
 * @property {number} timestamp - When was the message created
 * @property {string} content - Message content
 * @property {boolean} tts - Whether the message was text to speech
 * @property {any} mentions - Message mentions
 * @property {string[]} mentionRoles - Roles mentioned in message
 * @property {string[]} mentionChannels - Channels mentioned in message
 * @property {any} attachments - Attachments in message
 * @property {any} sticker - Stickers in message
 * @property {any} components - Message components
 * @property {ThreadChannel} thread - Thread the message was in, if its in a thread
 * @property {Message} referencedMessage - Message that was replied to
 * @property {MessageFlags} flags - Message flags
 * @property {APIMessageReference} messageReference - Message reference object
 * @property {string} applicationId - Application ID, if a application sent the message.
 * @property {number} type - Message type
 * @property {string} webhookId - Webhook id, if a webhook sent the message.
 * @property {boolean} pinned - Whether the message is pinned
 * @property {string | number} nonce - Message nonce
 * @property {any[]} reactions - Message reactions
 * @property {any[]} embeds - Message embeds
 * @property {APIMessage} raw - Raw message data
 * @property {Guild} guild - Guild the message was sent in
 * @property {TextChannel} channel - Channel the message was sent in
 */
export class Message {
    id: string;
    channelId: string;
    guildId: string;
    author: User;
    timestamp: number;
    content: string;
    tts: boolean;
    mentions: any;
    mentionRoles: string[];
    mentionChannels: any;
    attachments: any;
    stickers: any;
    components: any;
    thread: ThreadChannel | null;
    interaction: Interaction | null;
    referencedMessage: Message | null;
    flags: MessageFlags;
    messageReference: APIMessageReference;
    applicationId: string;
    type: number;
    webhookId: string;
    pinned: boolean;
    nonce: string | number;
    reactions: any[];
    embeds: any[];
    raw: APIMessage;
    client: Client;
    guild: Guild;
    channel: TextChannel;
    constructor(client: Client, data: APIMessage) {
        this.client = client;
        this.id = data.id;
        this.channelId = data.channel_id;
        this.guildId = data.guild_id;
        this.author = new User(client, data.author);
        this.content = data.content;
        this.timestamp = Math.round(new Date(data.timestamp).getTime() / 1000);
        this.tts = data.tts;
        this.mentions = data.mentions || [];
        this.mentionRoles = data.mention_roles || [];
        this.mentionChannels = data.mention_channels || [];
        this.attachments = data.attachments;
        this.embeds = data.embeds;
        this.reactions = data.reactions || [];
        this.nonce = data.nonce;
        this.pinned = data.pinned;
        this.webhookId = data.webhook_id;
        this.type = data.type;
        this.applicationId = data.application_id;
        this.messageReference = data.message_reference;
        this.flags = data.flags;
        this.referencedMessage = data.referenced_message ? new Message(client, data.referenced_message) : undefined;
        this.interaction = data.interaction
            ? new Interaction(client, data.interaction as unknown as APIInteraction)
            : undefined;
        this.thread = data.thread ? new ThreadChannel(client, data.thread) : undefined;
        this.components = data.components;
        this.stickers = data.sticker_items;
        if (client.raw) this.raw = data;
    }

    /**
     * An function that adds Message.guild and Message.channel to the message
     */
    async guilds() {
        this.guild = await this.client.guilds.get(this.guildId);
        this.channel = new TextChannel(this.client, (await this.guild.channels.get(this.channelId)).raw);
    }

    /**
     * Reply to the message
     * @param {MessageOptions} data - Options for the message
     */
    async reply(data: MessageOptions) {
        if (SystemMessageTypes.includes(MessageTypes[this.type])) {
            throw new APIError('Cannot reply to system messages.');
        }
        data.replyTo = this.id;
        return this.channel.send(data);
    }

    /**
     * Delete the message
     * @param {string} reason - Reason of the deletion
     */
    async delete(reason?: string) {
        const request = (await this.client.rest.delete(`/channels/${this.channelId}/messages/${this.id}`, {
            reason
        })) as any;

        if (request?.code) {
            throw new APIError(request?.message);
        }
    }

    /**
     * Edit the message
     * @param {MessageOptions} newMessage - The new message
     */
    async edit(newMessage: MessageOptions) {
        const request = (await this.client.rest.patch(`/channels/${this.channelId}/messages/${this.id}`, {
            body: new MessageOptions(newMessage)
        })) as any;

        if (request?.code) {
            throw new APIError(request?.message);
        }
    }

    /**
     * Pin this message
     * @param {string} [reason] - Reason for pinning the message
     */
    async pin(reason?: string) {
        const request = (await this.client.rest.put(`/channels/${this.channelId}/pins/${this.id}`, { reason })) as any;

        if (request?.code) {
            throw new APIError(request?.message);
        }
    }

    /**
     *  Unpin this message
     * @param {string} [reason] - Reason for unpinning the message
     */
    async unpin(reason?: string) {
        const request = (await this.client.rest.delete(`/channels/${this.channelId}/pins/${this.id}`, {
            reason
        })) as any;

        if (request?.code) {
            throw new APIError(request?.message);
        }
    }
}
