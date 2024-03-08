import { Client, ThreadMember } from "../";

export async function threadMemberUpdate(client: Client, data: { d: any }) {
	client.emit("threadMemberUpdate", new ThreadMember(data.d));
}
