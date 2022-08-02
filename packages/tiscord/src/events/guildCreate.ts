import { Client, Guild } from '../';

export async function guildCreate(client: Client, data: { d: any }) {
    const oldGuild = client.cache.guilds.get(BigInt(data.d.id));
    const guild = new Guild(client, data.d);
    client.cache.guilds.set(guild.id, guild);
    // @ts-expect-error
    if (oldGuild?.unavailable) return;
    client.emit('guildCreate', guild);
}
