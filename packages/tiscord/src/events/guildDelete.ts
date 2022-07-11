import { Client, Guild } from '../';

import { GatewayGuildDeleteDispatchData } from 'discord-api-types/v10';

export async function guildDelete(client: Client, data: { d: GatewayGuildDeleteDispatchData }) {
    // @ts-expect-error
    const guild = new Guild(client, data.d);
    if (data.d.unavailable) client.cache.guilds.set(data.d.id, guild);
    else client.cache.guilds.delete(data.d.id);
    client.emit('guildDelete', guild);
}
