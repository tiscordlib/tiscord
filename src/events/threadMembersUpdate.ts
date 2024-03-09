import { type Client, ThreadMember } from "../";

import type { APIThreadMember } from "discord-api-types/v10";

export async function threadMembersUpdate(
	client: Client,
	data: {
		d: {
			id: string;
			guild_id: string;
			member_count: number;
			added_members: APIThreadMember[];
			removedMemberIds: string[];
		};
	},
) {
	data.d.added_members.forEach((m) => {
		client.cache.threadMembers.set(BigInt(m.id), new ThreadMember(m));
	});
	data.d.removedMemberIds.forEach((m) => {
		client.cache.threadMembers.delete(BigInt(data.d.id), BigInt(m));
	});
	client.emit("threadMembersUpdate", [
		data.d.added_members,
		data.d.removedMemberIds,
	]);
}
