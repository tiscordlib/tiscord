import { APIRole } from 'discord-api-types/v10';
import { Client } from '../../';

/**
 * Role class
 *
 * @param {Client} client - Client instance
 * @param {APIRole} data - Role data
 * @class
 * @property {bigint} id - Role ID
 * @property {string} name - Role name
 * @property {string} color - Role color
 * @property {string} hoist - Is the role hoisted
 * @property {string} position - Role position
 * @property {string} managed - Is the role managed
 * @property {string} mentionable - Is the role mentionable
 * @property {string} [raw] - Raw role data
 * @property {string} [integrationId] - Integration ID
 * @property {BigInt} permissions - Permissions
 * @property {string} [botId] - Bot ID
 */
export class Role {
    id: bigint;
    name: string;
    color: number;
    hoist: boolean;
    position: number;
    permissions: bigint;
    managed: boolean;
    mentionable: boolean;
    botId?: bigint;
    integrationId?: bigint;
    raw?: APIRole;
    constructor(client: Client, data: APIRole) {
        this.id = BigInt(data.id);
        this.name = data.name;
        this.color = data.color;
        this.hoist = data.hoist;
        this.position = data.position;
        this.permissions = BigInt(data.permissions);
        this.managed = data.managed;
        this.mentionable = data.mentionable;
        if (data.tags?.bot_id) this.botId = BigInt(data.tags.bot_id);
        if (data.tags?.integration_id) this.integrationId = BigInt(data.tags.integration_id);
        if (client.raw) this.raw = data;
    }
}
