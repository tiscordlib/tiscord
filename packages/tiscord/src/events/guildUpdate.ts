import { Client, Guild } from '../';

import { GatewayGuildUpdateDispatchData } from 'discord-api-types/v10';

export async function guildUpdate(client: Client, data: { d: GatewayGuildUpdateDispatchData }) {
    const oldGuild = client.cache.guilds.get(data.d.id);
    // @ts-expect-error
    const guild = new Guild(client, data.d);
    client.cache.guilds.set(guild.id, guild);
    client.emit('guildUpdate', [oldGuild, guild]);
}
