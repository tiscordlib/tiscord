import { APIError, type Client, TextChannel } from "../../";
import { ThreadMember } from "../general/ThreadMember";

/**
 * A thread channel class.
 *
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

	/**
	 * Join this thread
	 * @returns {Promise<any>}
	 */
	join() {
		const request = this.client.rest.put(
			`/channels/${this.id}/thread-members/@me`,
		) as any;
		if (request?.code) {
			throw new APIError(request?.message);
		}
		return request;
	}

	/**
	 * Leave this thread
	 * @returns {Promise<any>}
	 */
	leave() {
		const request = this.client.rest.delete(
			`/channels/${this.id}/thread-members/@me`,
		) as any;
		if (request?.code) {
			throw new APIError(request?.message);
		}
		return request;
	}

	/**
	 * Add a member to thread
	 * @param {string} [member] - Member to add
	 */
	addMember(member: bigint) {
		const request = this.client.rest.put(
			`/channels/${this.id}/thread-members/${member}`,
		) as any;
		if (request?.code) {
			throw new APIError(request?.message);
		}
		return request;
	}

	/**
	 * Remove a member from a thread
	 * @param {bigint} [member] - Member to remove
	 */
	removeMember(member: bigint) {
		const request = this.client.rest.delete(
			`/channels/${this.id}/thread-members/${member}`,
		) as any;
		if (request?.code) {
			throw new APIError(request?.message);
		}
		return request;
	}

	/**
	 * Get a member
	 * @param member - ID of the member
	 */
	async getMember(member: bigint) {
		const cache = this.client.cache.threadMembers.get(this.id, member);
		if (cache) return cache;
		const request = (await this.client.rest.get(
			`/channels/${this.id}/thread-members/${member}`,
		)) as any;
		if (request?.code) {
			throw new APIError(request?.message);
		}
		const threadMember = new ThreadMember(request);
		this.client.cache.threadMembers.set(this.id, threadMember);
		return threadMember;
	}

	/**
	 * Get a list of members in this thread
	 * @returns {Promise<ThreadMember[]>}
	 */
	async listMembers() {
		const request = (await this.client.rest.get(
			`/channels/${this.id}/thread-members`,
		)) as any;
		if (request?.code) {
			throw new APIError(request?.message);
		}
		request.map((member: any) => new ThreadMember(member));
		request.forEach((member: ThreadMember) =>
			this.client.cache.threadMembers.set(member.userId, member),
		);
		return request.map((member: any) => new ThreadMember(member));
	}
}
