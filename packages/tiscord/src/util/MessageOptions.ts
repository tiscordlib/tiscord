/* eslint-disable camelcase */
import { APIAllowedMentions } from 'discord-api-types/v10';
import { Attachment } from '../';

/**
 * Message options, used for parsing messages to an api readable format
 * @param {RawMessageOptions} data - Message data
 * @class
 * @property {string} content - Message content
 * @property {any[]} embeds - Message embeds
 * @property {APIAllowedMentions} allowed_mentions - Allowed mentions
 * @property {any[]} components - Message components
 * @property {string[]} sticker_ids - Sticker IDs
 * @property {number} flags - Message flags
 * @property {any} message_reference - Message reference
 * @property {Attachment[]} attachments - Message attachments
 * @property {Attachment[]} files - Message files
 */
export class MessageOptions {
    content?: string;
    embeds?: any[];
    allowed_mentions?: APIAllowedMentions;
    components?: any[];
    sticker_ids?: string[];
    flags?: number;
    message_reference?: any;
    attachments?: Attachment[];
    files?: Attachment[];
    constructor(data: RawMessageOptions) {
        if (typeof data.content !== 'string' && data.content) throw new TypeError('`content` must be a string.');
        if (!data.content && !data.embeds && !data.attachments && !data.stickers)
            throw new TypeError('`content`, `embeds`, `attachments` and `stickers` are all empty.');
        this.content = data.content;
        if (data.embeds) this.embeds = data.embeds;
        if (data.allowedMentions) this.allowed_mentions = data.allowedMentions;
        if (data.replyTo) this.message_reference = { message_id: data.replyTo };
        if (data.components) this.components = data.components;
        if (data.stickers) this.sticker_ids = data.stickers;
        this.flags = data.flags || 0;
        if (data.attachments) this.attachments = data.attachments;
        if (data.files) this.files = data.files;
        if (data.ephemeral) this.flags += 64;
    }
}

/**
 * Message options type
 * @typedef {MessageOptions} MessageOptions
 * @property {string} content - Message content
 * @property {any[]} embeds - Message embeds
 * @property {APIAllowedMentions} allowedMentions - Allowed mentions
 * @property {any[]} components - Message components
 * @property {string[]} stickers - Sticker IDs
 * @property {number} flags - Message flags
 * @property {any} replyTo - Message reference
 * @property {boolean} ephemeral - Whether the message is ephemeral (Only for interactions)
 */
export interface RawMessageOptions {
    content?: string;
    embeds?: any[];
    allowedMentions?: APIAllowedMentions;
    attachments?: Attachment[];
    files?: Attachment[];
    components?: any[];
    stickers?: string[];
    flags?: number;
    replyTo?: any;
    ephemeral?: boolean;
}
