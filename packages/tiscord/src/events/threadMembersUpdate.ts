import { Client, ThreadMember } from '../';

import { APIThreadMember } from 'discord-api-types/v10';

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
    }
) {
    data.d.added_members.map(member => new ThreadMember(member));
    data.d.added_members.forEach(m => {
        client.cache.threadMembers.set(m.id, m);
    });
    data.d.removedMemberIds.forEach(m => {
        client.cache.threadMembers.delete(data.d.id, m);
    });
    client.emit('threadMembersUpdate', [data.d.added_members, data.d.removedMemberIds]);
}
