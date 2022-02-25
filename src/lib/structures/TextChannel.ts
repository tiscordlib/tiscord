import { Client, MessageOptions } from '../';
import { GuildChannel } from './GuildChannel';

export class TextChannel extends GuildChannel {
    lastMessageId: any;
    defaultArchiveDuration: any;
    send: (options: MessageOptions) => void;
    constructor(client: Client, data: any) {
        super(client, data);
        this.nsfw = data.nsfw;
        this.lastMessageId = data.last_message_id;
        this.defaultArchiveDuration = data.default_archive_duration;
        this.send = (options: MessageOptions) => {
            const parsedData = new MessageOptions(options);
            const res = this.client.rest.post(`/channels/${this.id}/messages`, { body: parsedData });
            return res;
        };
    }
}
