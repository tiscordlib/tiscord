import { APIError, Client, Guild, MemberOptions, Permissions, RawMemberOptions, User } from '../../';

import { APIGuildMember } from 'discord-api-types/v10';
import { MemberRoleManager } from '../../managers/MemberRoleManager';

/**
 * Member class
 *
 * @param {Client} client - Client instance
 * @param {APIGuildMember} data - Member data
 * @class
 * @property {Guild} guild - Guild the member belongs to
 * @property {Role[]} roles - Array of roles the member has
 * @property {User} user - User instance
 * @property {string} nick - Guild nickname
 * @property {string} joinedAt - when did the member join the guild
 * @property {string[]} roles - array of role IDs
 * @property {string} premiumSince - Since when is the member boosting the guild
 * @property {string} deaf - Is the member deafened
 * @property {string} mute - Is the member muted
 * @property {bigint} id - Member ID
 * @property {number} communicationDisabledUntil - When the member's timeout will expire
 * @property {boolean} pending - Is the member pending verification
 * @property {APIGuildMember} [raw] - Raw member data
 */
export class Member {
    client: Client;
    mute: boolean;
    deaf: boolean;
    premiumSince: string;
    joinedAt: string;
    #avatar: bigint;
    nick: string;
    user: User;
    raw?: APIGuildMember;
    id: bigint;
    guildId: bigint;
    guild?: Guild;
    communicationDisabledUntil: number;
    pending: boolean;
    #animated: boolean;
    roles: MemberRoleManager;
    constructor(client: Client, data: APIGuildMember, guild: Guild) {
        this.guild = guild;
        if (data.user) this.user = new User(client, data.user);
        this.client = client;
        this.#animated = data.avatar?.startsWith('a_');
        this.nick = data.nick;
        if (data.avatar) this.#avatar = BigInt(`0x${data.avatar}`);
        this.joinedAt = data.joined_at;
        this.premiumSince = data.premium_since;
        this.deaf = data.deaf;
        this.mute = data.mute;
        this.communicationDisabledUntil = new Date(data.communication_disabled_until).getTime() / 1000;
        this.pending = data.pending || false;
        if (client.raw) this.raw = data;
        this.id = this.user.id;
        this.guildId = guild?.id;
        this.roles = new MemberRoleManager(this, data.roles.map(BigInt));
        client.cache.users.set(this.user.id, this.user);
    }
    get permissions() {
        const { cache } = this.roles;
        // @ts-expect-error
        return new Permissions(cache.map(e => e?.permissions) || 0n);
    }

    /**
     * Avatar hash
     * @type {string}
     */
    get avatar() {
        return (this.#animated ? 'a_' : '') + this.#avatar.toString(16);
    }

    /**
     * Kick the member from the server
     * @param {string} reason - The reason of the kick. This will be shown in the audit logs
     */
    async kick(reason?: string) {
        const request = (await this.client.rest.delete(`/guilds/${this.guildId}/members/${this.id}`, {
            reason
        })) as any;

        if (request?.code) {
            throw new APIError(request?.message);
        }
    }

    /**
     * Ban the member from the server
     * @param {string} reason - The reason of the ban. This will be shown in the audit logs
     * @param {number} deleteMessageAfter - Number of days to delete messages for
     */
    async ban(reason?: string, deleteMessageAfter?: number) {
        const request = (await this.client.rest.put(`/guilds/${this.guildId}/bans/${this.id}`, {
            reason,
            // eslint-disable-next-line camelcase
            body: { delete_message_days: deleteMessageAfter }
        })) as any;

        if (request?.code) {
            throw new APIError(request?.message);
        }
    }

    /**
     * Edit the member
     * @param {string} reason - The reason of the edit. This will be shown in the audit logs
     * @param {MemberOptions} data - Data of the new members values
     */
    async edit(data: RawMemberOptions, reason?: string) {
        const request = (await this.client.rest.patch(`/guilds/${this.guildId}/members/${this.id}`, {
            reason,
            body: new MemberOptions(data)
        })) as any;

        if (request?.code) {
            throw new APIError(request?.message);
        }
    }

    /**
     * Timeout this member
     * @param {number} time - How long to timeout the member for (In seconds)
     */
    async timeout(time: number | null, reason: string) {
        if (time > 2592000) {
            throw new APIError('You cannot timeout a member for more than 30 days.');
        }
        const date = new Date(Date.now() / 1000 + time);
        this.edit({ communicationDisabledUntil: date.toISOString() }, reason);
    }
}
