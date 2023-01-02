import type { APISticker, StickerFormatType, StickerType, APIStickerItem } from 'discord-api-types/v10';
import type { Client } from '../../';
import { User } from '../../';

/**
 * Represents a sticker.
 *
 * @param {Client} client - The client.
 * @param {APISticker} data - The data for the sticker.
 * @class
 * @property {bigint} id - The ID of the sticker.
 * @property {string?} packId
 * @property {string} name - The name of the sticker.
 * @property {string?} description - Description of the sticker.
 * @property {string[]?} tags - Tags of the sticker.
 * @property {string} type  - The type of the sticker.
 */
export class Sticker {
    id: bigint;
    packId?: bigint;
    name: string;
    description?: string;
    tags?: string[];
    type: StickerType;
    formatType: StickerFormatType;
    available?: boolean;
    creator?: User;
    sortValue?: number;
    client: Client;
    constructor(client: Client, data: APISticker | APIStickerItem) {
        this.client = client;
        this._patch(data as any);
    }
    _patch(data: APISticker & APIStickerItem) {
        this.id = BigInt(data.id);
        if (data.pack_id) this.packId = BigInt(data.pack_id);
        this.name = data.name;
        if (data.description) this.description = data.description;
        if (data.tags) this.tags = data.tags?.split(',');
        this.type = data.type;
        this.formatType = data.format_type;
        if (data.available) this.available = data.available;
        if (data.user) this.creator = new User(this.client, data.user);
        this.sortValue = data.sort_value;
        if (this.creator) this.client.cache.users.set(this.creator.id, this.creator);
    }
}
