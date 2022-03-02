import { Client } from '../';
import { TextChannel } from './TextChannel';

/**
 * A thread channel class.
 * @param {Client} client - Client instance
 * @param {any} data - API thread channel data
 * @extends {TextChannel}
 * @class
 * @property {number} memberCount - Count of thread members, stops at 50
 * @property {number} messageCount - Count of messages in thread, stops at 50
 * @property {any} threadMetadata - Metadata
 */
export class ThreadChannel extends TextChannel {
    memberCount: number;
    messageCount: number;
    threadMetadata: any;
    constructor(client: Client, data: any) {
        super(client, data);
        this.messageCount = data.message_count;
        this.memberCount = data.member_count;
        this.threadMetadata = data.thread_metadata;
    }
}
