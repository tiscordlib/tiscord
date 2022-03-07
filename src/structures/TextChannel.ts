import { threadWrapper } from '../util/threadWrapper';
import { APIError, Client, Message, MessageManager, MessageOptions, ThreadData, ThreadOptions } from '../';
import { GuildChannel } from './GuildChannel';

/**
 * A guild channel class.
 * @param {Client} client - Client instance
 * @param {any} data - API guild channel data
 * @extends {GuildChannel}
 * @class
 * @property {string} lastMessageId - ID of last message
 * @property {number} defaultArchiveDuration - Default thread archive duration
 * @property {string} topic - Channel topic
 * @property {boolean} nsfw - Whether the channel is nsfw
 * @property {MessageManager} messages - Message manager
 */
export class TextChannel extends GuildChannel {
    lastMessageId: string;
    defaultArchiveDuration: number;
    topic: string;
    nsfw: boolean;
    messages: MessageManager;
    constructor(client: Client, data: any) {
        super(client, data);
        this.nsfw = data.nsfw;
        this.lastMessageId = data.last_message_id;
        this.defaultArchiveDuration = data.default_archive_duration;
        this.topic = data.topic;
        this.messages = new MessageManager(this.client, this);
    }

    /**
     * Send a message in the channel
     * @param {MessageOptions} options
     */
    send(options: MessageOptions) {
        const parsedData = new MessageOptions(options);
        const request = this.client.rest.post(`/channels/${this.id}/messages`, { body: parsedData }) as any;
        if (request?.code) {
            throw new APIError(request?.message);
        }
        return request;
    }

    /**
     * Bulk delete messges
     * @param amount - Amount of messages to delete (between 2 and 100)
     * @returns
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
    async getPinned() {
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
        // return new ThreadChannel(this.client, request);
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
