import { Client, Emoji } from '../';
import { APIEmoji } from 'discord-api-types/v10';

export async function guildEmojisUpdate(client: Client, data: { d: { guild_id: string; emojis: APIEmoji[] } }) {
    const guild = client.cache.guilds.get(data.d.guild_id);
    if (!guild) return;
    const emojis = data.d.emojis.map(e => new Emoji(client, e));
    guild.emojis = emojis;
    client.cache.guilds.set(guild.id, guild);
    return [guild, emojis];
}
