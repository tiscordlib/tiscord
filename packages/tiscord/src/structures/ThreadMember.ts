import { APIThreadMember } from 'discord-api-types/v10';

/**
 * Represents a thread member.
 *
 * @param {APIThreadMember} data - Data
 * @class
 * @property {string} userId - The user ID
 * @property {string} threadId - The thread ID
 * @property {string}
 */
export class ThreadMember {
    threadId: string;
    userId: string;
    joinTimestamp: number;
    flags: any;
    constructor(data: APIThreadMember) {
        this.threadId = data.id;
        this.userId = data.user_id;
        this.joinTimestamp = Math.round(new Date(data.join_timestamp).getTime() / 1000);
        this.flags = data.flags;
    }
}
