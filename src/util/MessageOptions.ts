/* eslint-disable camelcase */
import { APIAllowedMentions } from 'discord-api-types/v9';

export class MessageOptions {
    content: string;
    embeds?: any[];
    allowed_mentions?: APIAllowedMentions;
    components?: any[];
    sticker_ids?: string[];
    flags?: number;
    message_reference?: any;
    constructor(data: {
        content: string;
        embeds?: any[];
        allowedMentions?: APIAllowedMentions;
        components?: any[];
        stickers?: string[];
        flags?: number;
        replyTo?: any;
    }) {
        if (typeof data.content !== 'string') throw new TypeError('`content` must be a string.');
        this.content = data.content;
        if (data.embeds) this.embeds = data.embeds;
        if (data.allowedMentions) this.allowed_mentions = data.allowedMentions;
        if (data.replyTo) this.message_reference = { message_id: data.replyTo };
        if (data.components) this.components = data.components;
        if (data.stickers) this.sticker_ids = data.stickers;
        if (data.flags) this.flags = data.flags;
    }
}
export interface MessageOptions {
    content: string;
    embeds?: any[];
    allowedMentions?: APIAllowedMentions;
    components?: any[];
    stickers?: string[];
    flags?: number;
    replyTo?: any;
}
