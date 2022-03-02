import { Client, MessageManager, MessageOptions } from '../';
// eslint-disable-next-line no-duplicate-imports
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
        const res = this.client.rest.post(`/channels/${this.id}/messages`, { body: parsedData });
        return res;
    }
}
