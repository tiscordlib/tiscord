import type { Client, Guild, Member, RawMessageOptions, TextChannel, ThreadData } from '../../';
import {
    APIError,
    BaseThreadOptions,
    Interaction,
    MessageTypes,
    SystemMessageTypes,
    ThreadChannel,
    User,
    Sticker
} from '../../';
import type { APIInteraction, APIMessage, APIMessageReference, MessageFlags } from 'discord-api-types/v10';
import { ChannelType } from 'discord-api-types/v10';
import { Attachment } from './MessageAttachment';
import { MessageData } from '../../options/MessageOptions';

/**
 * Message class
 *
 * @param {Client} client - Client instance
 * @param {APIMessage} data - Message data
 * @class
 * @property {bigint} id - Message ID
 * @property {bigint} channelId - Channel ID
 * @property {User} author - Author user object
 * @property {number} timestamp - When was the message created (unix timestamp)
 * @property {string} content - Message content
 * @property {boolean} tts - Whether the message was text to speech
 * @property {any} mentions - Message mentions
 * @property {string[]} mentionRoles - Roles mentioned in message
 * @property {string[]} mentionChannels - Channels mentioned in message
 * @property {Attachment[]} attachments - Attachments in message
 * @property {Sticker[]} sticker - Stickers in message
 * @property {any} components - Message components
 * @property {ThreadChannel} thread - Thread the message was in, if its in a thread
 * @property {Message} referencedMessage - Message that was replied to
 * @property {MessageFlags} flags - Message flags
 * @property {APIMessageReference} messageReference - Message reference object
 * @property {bigint} applicationId - Application ID, if a application sent the message.
 * @property {string} type - Message type
 * @property {bigint} webhookId - Webhook id, if a webhook sent the message.
 * @property {boolean} pinned - Whether the message is pinned
 * @property {string | number} nonce - Message nonce
 * @property {any[]} reactions - Message reactions
 * @property {any[]} embeds - Message embeds
 * @property {APIMessage} [raw] - Raw message data
 * @property {Guild} guild - Guild the message was sent in
 * @property {TextChannel} channel - Channel the message was sent in
 * @property {Member} member - Member the message was sent by
 */
export class Message {
    id: bigint;
    channelId: bigint;
    guildId: bigint;
    author: User;
    timestamp: number;
    content: string;
    tts: boolean;
    mentions: any;
    mentionRoles: string[];
    mentionChannels: any;
    attachments: Attachment[];
    stickers: Sticker[];
    components: any;
    thread: ThreadChannel | null;
    interaction: Interaction | null;
    referencedMessage: Message | null;
    flags: MessageFlags;
    messageReference: APIMessageReference;
    applicationId: bigint;
    type: number;
    webhookId: bigint;
    pinned: boolean;
    nonce: string | number;
    reactions: any[];
    embeds: any[];
    raw: APIMessage;
    client: Client;
    guild: Guild;
    channel: TextChannel;
    member: Member;
    constructor(client: Client, data: APIMessage) {
        this.client = client;
        this._patch(data);
    }
    _patch(data: APIMessage) {
        if (data.id) this.id = BigInt(data.id);
        if (data.channel_id) this.channelId = BigInt(data.channel_id);
        // @ts-expect-error
        if (data.guild_id) this.guildId = BigInt(data.guild_id);
        if (data.author?.id) this.author = new User(this.client, data.author);
        this.guild = this.client.cache.guilds.get(this.guildId);
        this.content = data.content;
        this.timestamp = new Date(data.timestamp).getTime() / 1000;
        this.tts = data.tts;
        this.mentions = data.mentions || [];
        this.mentionRoles = data.mention_roles || [];
        this.mentionChannels = data.mention_channels || [];
        this.attachments = data.attachments?.map(attachment => new Attachment(attachment));
        this.embeds = data.embeds;
        this.reactions = data.reactions || [];
        this.nonce = data.nonce;
        this.pinned = data.pinned;
        if (data.webhook_id) this.webhookId = BigInt(data.webhook_id);
        this.type = data.type;
        if (data.application_id) this.applicationId = BigInt(data.application_id);
        this.messageReference = data.message_reference;
        this.flags = data.flags;
        this.referencedMessage = data.referenced_message
            ? new Message(this.client, data.referenced_message)
            : undefined;
        // @ts-expect-error
        if (data.interaction && this.guildId) data.interaction.guild_id = this.guildId;
        this.interaction = data.interaction
            ? new Interaction(this.client, data.interaction as unknown as APIInteraction)
            : undefined;
        this.thread = data.thread ? new ThreadChannel(this.client, data.thread) : undefined;
        this.components = data.components;
        this.stickers = data.sticker_items.map(e => new Sticker(this.client, e));
        if (this.client.raw) this.raw = data;
    }

    /**
     * An function that adds Message.guild and Message.channel to the message
     */
    async guilds() {
        this.channel = (await this.client.channels?.get(this.channelId)) as TextChannel;
        if (this.author?.id) this.member = await this.guild?.members?.get(this.author.id);
    }

    /**
     * Reply to the message
     * @param {RawMessageOptions} data - Options for the message
     */
    async reply(data: RawMessageOptions) {
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
    async edit(newMessage: RawMessageOptions) {
        const request = (await this.client.rest.patch(
            `/channels/${this.channelId}/messages/${this.id}`,
            new MessageData({ ...newMessage, ...this.client.allowedMentions })
        )) as any;

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

    /**
     * Create a thread on this message.
     * @param data - Thread data
     * @returns {Promise<any>}
     */
    async createThread(data: ThreadData) {
        // check if the message is in a text or news channel
        if (![ChannelType.GuildText, ChannelType.GuildNews].includes(this.channel.type)) {
            throw new APIError("Can't create a thread in a non-text channel.");
        }
        const request = (await this.client.rest.post(`/channels/${this.channel.id}/messages/${this.id}/threads`, {
            body: new BaseThreadOptions(data)
        })) as any;
        if (request?.code) {
            throw new APIError(request?.message);
        }
        const channel = new ThreadChannel(this.client, request);
        await channel.guilds();
        return channel;
    }
}
