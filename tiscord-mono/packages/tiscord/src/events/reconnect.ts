import { Client } from '../';

export async function reconnect(client: Client) {
    client.debug('Received reconnect event, reconnecting to gateway');
    client.ws.ws.close();
    client.ws.connect();
    client.ws.ws.on('open', () => {
        client.ws.ws.send(
            JSON.stringify({
                op: 6,
                d: {
                    token: client.token,
                    session_id: client.ws.sessionId,
                    seq: client.ws.sequence
                }
            })
        );
    });
    client.emit('reconnect');
}
