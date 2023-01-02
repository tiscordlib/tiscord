import type { APIThreadMember, ThreadMemberFlags } from 'discord-api-types/v10';
import type { Client } from '../../client/Client';

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
    flags: ThreadMemberFlags;
    constructor(_client: any, data: APIThreadMember) {
        this.threadId = BigInt(data.id);
        this._patch(data)
    }
    _patch(data: APIThreadMember) {
        if (data.user_id) this.userId = BigInt(data.user_id);
        if (data.join_timestamp) this.joinTimestamp = Math.round(new Date(data.join_timestamp).getTime() / 1000);
        if (data.flags) this.flags = data.flags;
    }
}
