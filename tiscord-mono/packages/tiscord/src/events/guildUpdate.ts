import { Client, Guild } from '../';

import { APIGuild } from 'discord-api-types/v10';

export async function guildUpdate(client: Client, data: { d: APIGuild }) {
    const oldGuild = client.cache.guilds.get(data.d.id);
    const guild = new Guild(client, data.d);
    client.cache.guilds.set(guild.id, guild);
    client.emit('guildUpdate', [oldGuild, guild]);
}
