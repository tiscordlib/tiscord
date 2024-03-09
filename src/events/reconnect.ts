import type { Client } from "../";

export async function reconnect(client: Client) {
	client.debug("Received reconnect event, reconnecting to gateway", "gateway");
	client.ws.connection.close();
	client.ws.connect();
	client.ws.connection.on("open", () => {
		client.ws.send({
			op: 6,
			d: {
				token: client.token,
				session_id: client.ws.sessionId,
				seq: client.ws.sequence,
			},
		});
	});
	client.emit("reconnect");
}
