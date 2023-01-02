import type { APIUser, UserFlags } from 'discord-api-types/v10';
import type { Client } from '../../';

/**
 * User class
 *
 * @param {Client} client - Client instance
 * @param {APIUser} data - User data
 * @class
 * @param {string} id - User ID
 * @param {string} username - User username (username)
 * @param {string} discriminator - User discriminator (1234)
 * @param {string} tag - User tag (username#1234)
 * @param {boolean} bot - Is the user a bot
 * @param {boolean} system - Is the user a system user
 * @param {UserFlags} flags - User flags
 * @param {number} accentColor - User accent color
 * @param {APIUser} [raw] - Raw user data
 */
export class User {
    id: bigint;
    username: string;
    discriminator: string;
    tag: string;
    #avatar: bigint;
    bot: boolean;
    system: boolean;
    #banner?: bigint;
    flags: UserFlags;
    accentColor: number;
    raw?: APIUser;
    #animated?: boolean;
    client: Client;
    constructor(client: Client, data: APIUser) {
        this.client = client;
        this._patch(data);
    }
    _patch(data: APIUser) {
        this.id = BigInt(data.id);
        this.username = data.username;
        this.discriminator = data.discriminator;
        this.tag = `${this.username}#${this.discriminator}`;
        if (data.avatar) {
            if (data.avatar.startsWith('a_')) {
                data.avatar = data.avatar.slice(2);
                this.#animated = true;
            }
            this.#avatar = BigInt(`0x${data.avatar}`);
        }
        this.bot = data.bot || false;
        this.system = data.system || false;
        if (data.banner) this.#banner = BigInt(`0x${data.banner}`);
        this.flags = data.public_flags;
        this.accentColor = data.accent_color;
        if (this.client.raw) this.raw = data;
    }

    /**
     * Avatar hash
     * @type {string}
     */
    get avatar() {
        return (this.#animated ? 'a_' : '') + this.#avatar.toString(16);
    }

    /**
     * Banner hash
     * @type {string}
     */
    get banner() {
        return this.#banner.toString(16);
    }
}
