import { Client, TextChannel } from '../';
export class ThreadChannel extends TextChannel {
    memberCount: any;
    messageCount: any;
    threadMetadata: any;
    constructor(client: Client, data: any) {
        super(client, data);
        this.messageCount = data.message_count;
        this.memberCount = data.member_count;
        this.threadMetadata = data.thread_metadata;
    }
}
