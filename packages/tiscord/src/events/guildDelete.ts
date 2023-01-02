import type { Client } from '../';
import { Guild } from '../';

import type { GatewayGuildDeleteDispatchData } from 'discord-api-types/v10';

export async function guildDelete(client: Client, data: { d: GatewayGuildDeleteDispatchData }) {
    // @ts-expect-error
    const guild = new Guild(client, data.d);
    if (data.d.unavailable) client.cache.guilds.set(guild.id, guild);
    else client.cache.guilds.delete(guild.id);
    client.emit('guildDelete', guild);
}
