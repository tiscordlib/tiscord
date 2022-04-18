import { Client, User } from '../';

import { APIUser } from 'discord-api-types/v10';

export async function guildBanAdd(client: Client, data: { d: { guild_id: string; user: APIUser } }) {
    const guild = await client.guilds.get(data.d.guild_id);
    const user = new User(client, data.d.user);
    client.emit('guildBanAdd', [guild, user]);
}
