import type { Client } from '../';

export async function guildIntegrationsUpdate(client: Client, data: { d: { guild_id: string } }) {
    const guild = client.guilds.get(BigInt(data.d.guild_id));
    client.emit('guildIntegrationsUpdate', guild);
}
