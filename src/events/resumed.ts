import { Client } from "../";

export async function resumed(client: Client) {
	client.emit("resumed");
}
