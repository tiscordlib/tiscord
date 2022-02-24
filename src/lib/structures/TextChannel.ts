import { GuildChannel } from './GuildChannel';

export class TextChannel extends GuildChannel {
    lastMessageId: any;
    defaultArchiveDuration: any;
    constructor(data: any) {
        super(data);
        this.nsfw = data.nsfw;
        this.lastMessageId = data.last_message_id;
        this.defaultArchiveDuration = data.default_archive_duration;
    }
}
