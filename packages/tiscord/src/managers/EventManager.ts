import { channelCreate } from '../events/channelCreate';
import { channelDelete } from '../events/channelDelete';
import { channelPinsUpdate } from '../events/channelPinsUpdate';
import { channelUpdate } from '../events/channelUpdate';
import { guildBanAdd } from '../events/guildBanAdd';
import { guildCreate } from '../events/guildCreate';
import { guildDelete } from '../events/guildDelete';
import { guildEmojisUpdate } from '../events/guildEmojisUpdate';
import { guildIntegrationsUpdate } from '../events/guildIntegrationsUpdate';
import { guildMemberAdd } from '../events/guildMemberAdd';
import { guildMemberRemove } from '../events/guildMemberRemove';
import { guildMemberUpdate } from '../events/guildMemberUpdate';
import { guildStickersUpdate } from '../events/guildStickersUpdate';
import { guildUpdate } from '../events/guildUpdate';
import { interactionCreate } from '../events/interactionCreate';
import { messageCreate } from '../events/messageCreate';
import { messageDelete } from '../events/messageDelete';
import { messageUpdate } from '../events/messageUpdate';
import { reconnect } from '../events/reconnect';
import { resumed } from '../events/resumed';
import { threadCreate } from '../events/threadCreate';
import { threadDelete } from '../events/threadDelete';
import { threadListSync } from '../events/threadListSync';
import { threadMemberUpdate } from '../events/threadMemberUpdate';
import { threadMembersUpdate } from '../events/threadMembersUpdate';
import { threadUpdate } from '../events/threadUpdate';
import { typingStart } from '../events/typingStart';
import { ready } from '../events/ready';
import type { Client } from '../rest';

/**
 * An event manager class
 * This is internal, you shouldnt use this.
 * @internal
 */
export class EventManager {
    list: Map<string, (client: Client, data: any) => void>;
    constructor() {
        this.list = new Map();
        this.register('READY', ready);
        this.register('GUILD_CREATE', guildCreate);
    }
    registerAll() {
        this.register('INTERACTION_CREATE', interactionCreate);
        this.register('RECONNECT', reconnect);
        this.register('RESUMED', resumed);
        this.register('CHANNEL_CREATE', channelCreate);
        this.register('CHANNEL_UPDATE', channelUpdate);
        this.register('CHANNEL_DELETE', channelDelete);
        this.register('CHANNEL_PINS_UPDATE', channelPinsUpdate);
        this.register('THREAD_CREATE', threadCreate);
        this.register('THREAD_UPDATE', threadUpdate);
        this.register('THREAD_DELETE', threadDelete);
        this.register('THREAD_LIST_SYNC', threadListSync);
        this.register('THREAD_MEMBER_UPDATE', threadMemberUpdate);
        this.register('THREAD_MEMBERS_UPDATE', threadMembersUpdate);
        this.register('GUILD_UPDATE', guildUpdate);
        this.register('GUILD_DELETE', guildDelete);
        this.register('GUILD_BAN_ADD', guildBanAdd);
        this.register('GUILD_BAN_REMOVE', guildBanAdd);
        this.register('GUILD_EMOJIS_UPDATE', guildEmojisUpdate);
        this.register('GUILD_STICKERS_UPDATE', guildStickersUpdate);
        this.register('GUILD_INTEGRATIONS_UPDATE', guildIntegrationsUpdate);
        this.register('GUILD_MEMBER_ADD', guildMemberAdd);
        this.register('GUILD_MEMBER_UPDATE', guildMemberUpdate);
        this.register('GUILD_MEMBER_REMOVE', guildMemberRemove);
        this.register('MESSAGE_CREATE', messageCreate);
        this.register('MESSAGE_DELETE', messageDelete);
        this.register('MESSAGE_UPDATE', messageUpdate);
        this.register('TYPING_START', typingStart);
    }
    register(name: string, handler: any) {
        this.list.set(name, handler);
    }
}
