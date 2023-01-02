import type { Client } from '../';

export async function resumed(client: Client) {
    client.emit('resumed');
}
