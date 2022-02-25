import { Client } from '../';
import { Channel } from './Channel';

export class GuildChannel extends Channel {
    guildId: any;
    position: any;
    permissionOverwrites: any;
    topic: string;
    nsfw: boolean;
    permissions: any;
    constructor(client: Client, data: any) {
        super(client, data);
        this.guildId = data.guild_id;
        this.position = data.position;
        this.permissionOverwrites = data.permission_overwrites;
        this.topic = data.topic;
        this.nsfw = data.nsfw;
        this.permissions = data.permissions;
    }
}
