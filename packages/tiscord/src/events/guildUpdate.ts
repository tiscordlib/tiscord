import type { Client } from '../';
import { Guild } from '../';

import type { GatewayGuildUpdateDispatchData } from 'discord-api-types/v10';

export async function guildUpdate(client: Client, data: { d: GatewayGuildUpdateDispatchData }) {
    const oldGuild = client.cache.guilds.get(BigInt(data.d.id));
    const guild = new Guild(client, data.d);
    client.cache.guilds.set(guild.id, guild);
    client.emit('guildUpdate', [oldGuild, guild]);
}
