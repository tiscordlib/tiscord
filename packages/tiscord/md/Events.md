An full list of events in Tiscord

We recommend checking [this](https://discord.com/developers/docs/topics/gateway) for a bit more internal information about events

**You don't need to use the same property names as we do, they just have to be in the right order!**

| Name         | Description     | Properties |
|--------------|-----------|------------|
| ready | Sent when the bot is ready.      | `None` |
| resumed | Sent when the bot resumes (for example when the gateway errors) | `None` |
| reconnect | Sent when the gateway tells the bot to reconnect. | `None` |
| channelCreate | Sent when a channel is created. | `channel: Channel` |
| channelUpdate | Sent when a channel is updated. | `oldChannel: Channel, newChannel: Channel` |
| channelDelete | Sent when a channel is deleted. | `channel: Channel` |
| channelPinsUpdate | Sent when a message is pinned/unpinned in a channel. | `channel: Channel` |
| messageCreate | Sent when a message is created. | `message: Message` |
| interactionCreate | Sent when the bot receives an interaction. | `interaction: Interaction` |
| threadCreate | Sent when a thread is created | `thread: ThreadChannel` |
| threadUpdate | Sent when a thread is updated | `oldThread: ThreadChannel, newThread: ThreadChannel` |
| threadDelete | Sent when a thread is deleted | `thread: ThreadChannel` |
| threadListSync | Sent when the bot joins a new thread | `threads: ThreadChannel[], threadMembers: ThreadMember[]` |
| threadMemberUpdate | Sent when the thread member object for the current user is updated. Mostly a signal that the bot joined a thread. | `threadMember: ThreadMember` |
| threadMembersUpdate | Sent when anyone is added to or removed from a thread. | `addedMembers: ThreadMember[], removedMembers: string[]` |
| guildCreate | Sent when the bot joins a guild, or a guild becomes available. | `guild: Guild` |
| guildUpdate | Sent when a guild is updated. | `oldGuild: Guild, newGuild: Guild` |
| guildBanAdd | Sent when a member is banned. | `guild: Guild, user: User` |
| guildBanRemove | Sent when a member is unbanned. | `guild: Guild, user: User` |
| guildEmojisUpdate | Sent when guild emojis are updated | `guild: Guild, emojis: Emoji[]` |
| guildStickersUpdate | Sent when guild stickers are updated | `guild: Guild, stickers: Sticker[]` | 
| guildIntegrationsUpdate | Sent when guilds integrations are updated | `guild: Guild` |
| guildMemberAdd | Sent when a member joins a guild. | `guild: Guild, member: Member` |
| guildMemberUpdate | Sent when a member updates their profile. | `guild: Guild, member: Member` |
| messageDelete | Sent when a message is deleted. Note: This event doesn't emit if the message isn't in cache. | `guild: Guild, channel: Channel, message: Message` |
| typingStart | Sent when user starts typing. | `guild: Guild, channel: Channel, member: Member, timestamp: number` |
| guildRoleCreate | Sent when a role is created. |`guild: Guild, role: Role`|
| guildRoleUpdate | Sent when a role is updated. | `guild: Guild, oldRole: Role, newRole: Role` |
| guildRoleDelete | Sent when a role is deleted. Only sent if the role is in cache. | `guild: Guild, role: Role` |    
    Integration Create
    Integration Update
    Integration Delete
    Invite Create
    Invite Delete
    Message Update
    Message Delete Bulk
    Message Reaction Add
    Message Reaction Remove
    Message Reaction Remove All
    Message Reaction Remove Emoji
    Presence Update
    Stage Instance Create
    Stage Instance Update
    Stage Instance Delete
    User Update
    Webhooks Update