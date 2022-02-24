import { TextChannel } from './TextChannel';

export class ThreadChannel extends TextChannel {
    memberCount: any;
    messageCount: any;
    threadMetadata: any;
    constructor(data: any) {
        super(data);
        this.messageCount = data.message_count;
        this.memberCount = data.member_count;
        this.threadMetadata = data.thread_metadata;
    }
}
