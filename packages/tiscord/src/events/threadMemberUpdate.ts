import type { Client } from '../';
import { ThreadMember } from '../';

export async function threadMemberUpdate(client: Client, data: { d: any }) {
    client.emit('threadMemberUpdate', new ThreadMember(null, data.d));
}
