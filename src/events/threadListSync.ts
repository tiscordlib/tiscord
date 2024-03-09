import type { APIThreadChannel, APIThreadMember } from "discord-api-types/v10";
import { type Client, ThreadChannel, ThreadMember } from "../";

export async function threadListSync(
	client: Client,
	data: {
		d: {
			guild_id: string;
			channel_ids: string[];
			threads: APIThreadChannel[];
			members: any;
		};
	},
) {
	data.d.threads.map((thread) => {
		const channel = new ThreadChannel(client, thread);
		channel.guilds();
		return channel;
	});
	data.d.members.map((member: APIThreadMember) => new ThreadMember(member));
	// @ts-expect-error
	data.d.threads.forEach((thread: ThreadChannel) =>
		client.cache.channels.set(BigInt(thread.id), thread),
	);
	data.d.members.forEach((member: ThreadMember) =>
		client.cache.threadMembers.set(member.threadId, member),
	);
	client.emit("threadListSync", [data.d.threads, data.d.members]);
}
