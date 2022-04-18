import { Client, Sticker } from '../';
import { APISticker } from 'discord-api-types/v10';

export async function guildStickersUpdate(client: Client, data: { d: { guild_id: string; stickers: APISticker[] } }) {
    const guild = client.cache.guilds.get(data.d.guild_id);
    if (!guild) return;
    const stickers = data.d.stickers.map(e => new Sticker(client, e));
    guild.stickers = stickers;
    client.cache.guilds.set(guild.id, guild);
    return [guild, stickers];
}
