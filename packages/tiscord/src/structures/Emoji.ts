import { Client, User } from '../';

import { APIEmoji } from 'discord-api-types/v10';

/**
 * Represents an emoji.
 * @class
 * @param {Client} client - Client instance
 * @param {APIEmoji} data - Emoji data
 * @property {string} id - Emoji ID
 * @property {string} name - Emoji name
 * @property {string[]} roles - Roles that can use this emoji
 * @property {boolean} requireColons - Whether this emoji requires colons
 * @property {User} [author] - User that created this emoji
 * @property {boolean} managed - Whether this emoji is managed
 * @property {boolean} animated - Whether this emoji is animated
 * @property {boolean} available - Whether this emoji is available
 * @property {APIEmoji} [raw] - raw data
 */
export class Emoji {
    id: string;
    name: string;
    roles: string[];
    author: User;
    requireColons: boolean;
    managed: boolean;
    animated: boolean;
    available: boolean;
    raw: APIEmoji;
    constructor(client: Client, emoji: APIEmoji) {
        this.id = emoji.id;
        this.name = emoji.name;
        this.roles = emoji.roles;
        if (emoji.user) this.author = new User(client, emoji.user);
        this.requireColons = emoji.require_colons;
        this.managed = emoji.managed;
        this.animated = emoji.animated;
        this.available = emoji.available;
        if (client.raw) this.raw = emoji;
        if (emoji.user) client.cache.users.set(this.author.id, this.author);
    }
}
