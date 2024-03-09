import type { APISticker } from "discord-api-types/v10";
import { type Client, Sticker } from "../";

export async function guildStickersUpdate(
	client: Client,
	data: { d: { guild_id: string; stickers: APISticker[] } },
) {
	const guild = client.cache.guilds.get(BigInt(data.d.guild_id));
	if (!guild) return;
	const stickers = data.d.stickers.map((e) => new Sticker(client, e));
	guild.stickers = stickers;
	client.cache.guilds.set(guild.id, guild);
	client.emit("guildStickersUpdate", [guild, stickers]);
}
