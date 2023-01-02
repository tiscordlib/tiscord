import type { Client, RawMessageOptions, ThreadData } from '../../';
import { APIError, Message, MessageManager, ThreadOptions } from '../../';
import { GuildChannel } from './GuildChannel';
import { threadWrapper } from '../../util/threadWrapper';
import { MessageData } from '../../options/MessageOptions';
import type { APITextChannel } from 'discord-api-types/v10';

/**
 * A text channel class.
 *
 * @param {Client} client - Client instance
 * @param {import('discord-api-types/v10').APITextChannel} data - API guild channel data
 * @extends {GuildChannel}
 * @class
 * @property {bigint} lastMessageId - ID of last message
 * @property {number} defaultAutoArchiveDuration - Default thread archive duration
 * @property {string} topic - Channel topic
 * @property {boolean} nsfw - Whether the channel is nsfw
 * @property {MessageManager} messages - Message manager
 */
export class TextChannel extends GuildChannel {
    lastMessageId: bigint;
    defaultAutoArchiveDuration: number;
    topic: string;
    nsfw: boolean;
    messages: MessageManager;
    constructor(client: Client, data: APITextChannel) {
        super(client, data);
        this.messages = new MessageManager(this.client, this);
    }
    _patch(data: APITextChannel) {
        super._patch(data);
        if ('nsfw' in data) this.nsfw = data.nsfw;
        if ('last_message_id' in data) this.lastMessageId = BigInt(data.last_message_id);
        if ('default_auto_archive_duration' in data)
            this.defaultAutoArchiveDuration = data.default_auto_archive_duration;
        if ('topic' in data) this.topic = data.topic;
    }

    /**
     * Send a message in the channel
     * @param {RawMessageOptions} options
     */
    async send(options: RawMessageOptions) {
        const parsedData = new MessageData({ allowedMentions: this.client.allowedMentions, ...options });
        const request = this.client.rest.post(`/channels/${this.id}/messages`, parsedData) as any;
        if (request?.code) {
            throw new APIError(request?.message);
        }
        const message = new Message(this.client, await request);
        message.guildId = this.guildId;
        await message.guilds();
        return message;
    }

    /**
     * Bulk delete messges
     * @param amount - Amount of messages to delete (between 2 and 100)
     */
    async bulkDelete(amount: number) {
        if (amount < 2 || amount > 100) throw new APIError('You can only bulk delete between 2 and 100 messages.');
        const messageIds = (await this.messages.fetch(amount)).map(m => m.id);
        const request = this.client.rest.post(`/channels/${this.id}/messages/bulk-delete`, {
            body: { messages: messageIds }
        }) as any;
        if (request?.code) {
            throw new APIError(request?.message);
        }
        return request;
    }

    /**
     * Trigger typing status in the channel
     * @returns {any}
     */
    async typing() {
        const request = (await this.client.rest.post(`/channels/${this.id}/typing`)) as any;
        if (request?.code) {
            throw new APIError(request?.message);
        }
        return request;
    }

    /**
     * Get all pinned messages from a channel
     * @returns {Message[]}
     */
    async getPinnedMessages() {
        const request = (await this.client.rest.get(`/channels/${this.id}/pins`)) as any;
        if (request?.code) {
            throw new APIError(request?.message);
        }
        return request.map(m => new Message(this.client, m));
    }

    /**
     * Create a thread in this channel
     * @param {ThreadData} data - Thread data
     * @returns {Promise<any>}
     */
    async createThread(data: ThreadData) {
        const request = (await this.client.rest.post(`/channels/${this.id}/threads`, {
            body: new ThreadOptions(data)
        })) as any;
        if (request?.code) {
            throw new APIError(request?.message);
        }
        return threadWrapper(this.client, request);
    }

    /**
     * Get all public archived threads in this channel
     * @returns {Promise<ThreadChannel[]>}
     */
    async getPublicArchivedThreads() {
        const request = (await this.client.rest.get(`/channels/${this.id}/threads/archived/public`)) as any;
        if (request?.code) {
            throw new APIError(request?.message);
        }
        return request.threads.map(t => threadWrapper(this.client, t));
    }

    /**
     * Get all private archived threads in this channel
     * @returns {Promise<ThreadChannel[]>}
     */
    async getPrivateArchivedThreads() {
        const request = (await this.client.rest.get(`/channels/${this.id}/threads/archived/private`)) as any;
        if (request?.code) {
            throw new APIError(request?.message);
        }
        return request.threads.map(t => threadWrapper(this.client, t));
    }

    /**
     * Get all private archived threads in this channel that the bot joined.
     * @returns {Promise<ThreadChannel[]>}
     */
    async getJoinedPrivateArchivedThreads() {
        const request = (await this.client.rest.get(`/channels/${this.id}/users/@me/threads/archived/private`)) as any;
        if (request?.code) {
            throw new APIError(request?.message);
        }
        return request.threads.map(t => threadWrapper(this.client, t));
    }
}
