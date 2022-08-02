import { APIThreadMember } from 'discord-api-types/v10';

/**
 * Represents a thread member.
 *
 * @param {APIThreadMember} data - Data
 * @class
 * @property {bigint} userId - The user ID
 * @property {bigint} threadId - The thread ID
 * @property {string}
 */
export class ThreadMember {
    threadId: bigint;
    userId: bigint;
    joinTimestamp: number;
    flags: any;
    constructor(data: APIThreadMember) {
        this.threadId = BigInt(data.id);
        this.userId = BigInt(data.user_id);
        this.joinTimestamp = Math.round(new Date(data.join_timestamp).getTime() / 1000);
        this.flags = data.flags;
    }
}
