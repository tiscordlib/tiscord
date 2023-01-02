import type { Client } from '../';
import { User } from '../';

import type { APIUser } from 'discord-api-types/v10';

export async function guildBanRemove(client: Client, data: { d: { guild_id: string; user: APIUser } }) {
    const guild = await client.guilds.get(BigInt(data.d.guild_id));
    const user = new User(client, data.d.user);
    client.emit('guildBanRemove', [guild, user]);
}
