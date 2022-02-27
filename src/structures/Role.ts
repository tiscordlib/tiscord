import { APIRole } from 'discord-api-types/v10';
import { Client } from '../';

export class Role {
    id: string;
    name: string;
    color: number;
    hoist: boolean;
    position: number;
    permissions: string;
    managed: boolean;
    mentionable: boolean;
    botId: string;
    integrationId: string;
    raw: APIRole;
    constructor(client: Client, data: APIRole) {
        this.id = data.id;
        this.name = data.name;
        this.color = data.color;
        this.hoist = data.hoist;
        this.position = data.position;
        this.permissions = data.permissions;
        this.managed = data.managed;
        this.mentionable = data.mentionable;
        this.botId = data.tags.bot_id;
        this.integrationId = data.tags.integration_id;
        if (client.raw) this.raw = data;
    }
}
