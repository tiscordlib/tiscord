import { Client, Guild } from '../';

import { APIGuild } from 'discord-api-types/v10';

export async function guildDelete(client: Client, data: { d: APIGuild }) {
    if (data.d.unavailable) client.cache.guilds.set(data.d.id, new Guild(client, data.d));
    else client.cache.guilds.delete(data.d.id);
    client.emit('guildDelete', new Guild(client, data.d));
}
