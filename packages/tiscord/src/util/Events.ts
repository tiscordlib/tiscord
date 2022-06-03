import { Channel, Emoji, Guild, Interaction, Member, Message, Role, Sticker, ThreadChannel, ThreadMember, User } from "../"
export interface Events {
    'channelCreate': (channel: Channel) => void;
    'channelDelete': (channel: Channel) => void;
    'channelPinsUpdate': (channel: Channel) => void;
    'channelUpdate': (
        oldChannel: Channel, channel: Channel
    ) => void;
    'guildBanAdd': (
        guild: Guild, user: User
    ) => void;
    'guildBanRemove': (
        guild: Guild, user: User
    ) => void;
    'guildCreate': (guild: Guild) => void;
    'guildDelete': (guild: Guild) => void;
    'guildEmojisUpdate': (
        guild: Guild, emojis: Emoji[]
    ) => void;
    'guildIntegrationsUpdate': Guild;
    'guildMemberAdd': (
        guild: Guild, member: Member
    ) => void;
    'guildMemberUpdate': (
        guild: Guild, member: Member
    ) => void;
    'guildMemberRemove': (
        guild: Guild, user: User
    ) => void;
    'guildRoleCreate': (
        guild: Guild, role: Role
    ) => void;
    'guildRoleUpdate': (
        guild: Guild, role: Role
    ) => void;
    'guildRoleRemove': (
        guild: Guild, role: Role
    ) => void;
    'guildStickersUpdate': (
        guild: Guild, stickers: Sticker[]
    ) => void;
    'guildUpdate': (
        oldGuild: Guild, guild: Guild
    ) => void;
    'interactionCreate': (interaction: Interaction) => void;
    'messageCreate': (message: Message) => void;
    'messageDelete': (message: Message) => void;
    'ready': () => void;
    'reconnect': () => void;
    'resumed': () => void;
    'threadCreate': ThreadChannel;
    'threadDelete': (
        thread: ThreadChannel
    ) => void;
    'threadListSync': (
        threads: ThreadChannel[], members: ThreadMember[]
    ) => void;
    'threadMembersUpdate': (
        addedMembers: ThreadMember[], removedMemberIds: string[]
    ) => void;
    'threadMemberUpdate': (
        member: ThreadMember
    ) => void;
    'threadUpdate': (
        oldChannel: ThreadChannel, channel: ThreadChannel
    ) => void;
    'typingStart': (channel: Channel, user: User) => void;
}