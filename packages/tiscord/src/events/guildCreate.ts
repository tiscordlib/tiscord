import { Client, Guild } from '../';

export async function guildCreate(client: Client, data: { d: any }) {
    const oldGuild = client.cache.guilds.get(data.d.id);
    const guild = new Guild(client, data.d);
    client.cache.guilds.set(guild.id, guild);
    client.debug('received guildCreate')
    if (oldGuild?.unavailable) return;
    client.emit('guildCreate', guild);
}
