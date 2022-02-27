[tiscord](../README.md) / [Exports](../modules.md) / ThreadChannel

# Class: ThreadChannel

## Hierarchy

- [`TextChannel`](TextChannel.md)

  ↳ **`ThreadChannel`**

## Table of contents

### Constructors

- [constructor](ThreadChannel.md#constructor)

### Properties

- [client](ThreadChannel.md#client)
- [defaultArchiveDuration](ThreadChannel.md#defaultarchiveduration)
- [guildId](ThreadChannel.md#guildid)
- [id](ThreadChannel.md#id)
- [lastMessageId](ThreadChannel.md#lastmessageid)
- [memberCount](ThreadChannel.md#membercount)
- [messageCount](ThreadChannel.md#messagecount)
- [messages](ThreadChannel.md#messages)
- [name](ThreadChannel.md#name)
- [nsfw](ThreadChannel.md#nsfw)
- [permissionOverwrites](ThreadChannel.md#permissionoverwrites)
- [permissions](ThreadChannel.md#permissions)
- [position](ThreadChannel.md#position)
- [raw](ThreadChannel.md#raw)
- [send](ThreadChannel.md#send)
- [threadMetadata](ThreadChannel.md#threadmetadata)
- [topic](ThreadChannel.md#topic)
- [type](ThreadChannel.md#type)

## Constructors

### constructor

• **new ThreadChannel**(`client`, `data`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`Client`](Client.md) |
| `data` | `any` |

#### Overrides

[TextChannel](TextChannel.md).[constructor](TextChannel.md#constructor)

#### Defined in

[src/structures/ThreadChannel.ts:7](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/ThreadChannel.ts#L7)

## Properties

### client

• **client**: [`Client`](Client.md)

#### Inherited from

[TextChannel](TextChannel.md).[client](TextChannel.md#client)

#### Defined in

[src/structures/Channel.ts:9](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Channel.ts#L9)

___

### defaultArchiveDuration

• **defaultArchiveDuration**: `any`

#### Inherited from

[TextChannel](TextChannel.md).[defaultArchiveDuration](TextChannel.md#defaultarchiveduration)

#### Defined in

[src/structures/TextChannel.ts:7](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/TextChannel.ts#L7)

___

### guildId

• **guildId**: `string`

#### Inherited from

[TextChannel](TextChannel.md).[guildId](TextChannel.md#guildid)

#### Defined in

[src/structures/GuildChannel.ts:5](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/GuildChannel.ts#L5)

___

### id

• **id**: `string`

#### Inherited from

[TextChannel](TextChannel.md).[id](TextChannel.md#id)

#### Defined in

[src/structures/Channel.ts:6](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Channel.ts#L6)

___

### lastMessageId

• **lastMessageId**: `any`

#### Inherited from

[TextChannel](TextChannel.md).[lastMessageId](TextChannel.md#lastmessageid)

#### Defined in

[src/structures/TextChannel.ts:6](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/TextChannel.ts#L6)

___

### memberCount

• **memberCount**: `any`

#### Defined in

[src/structures/ThreadChannel.ts:4](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/ThreadChannel.ts#L4)

___

### messageCount

• **messageCount**: `any`

#### Defined in

[src/structures/ThreadChannel.ts:5](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/ThreadChannel.ts#L5)

___

### messages

• **messages**: [`MessageManager`](MessageManager.md)

#### Inherited from

[TextChannel](TextChannel.md).[messages](TextChannel.md#messages)

#### Defined in

[src/structures/TextChannel.ts:9](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/TextChannel.ts#L9)

___

### name

• **name**: `string`

#### Inherited from

[TextChannel](TextChannel.md).[name](TextChannel.md#name)

#### Defined in

[src/structures/Channel.ts:8](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Channel.ts#L8)

___

### nsfw

• **nsfw**: `boolean`

#### Inherited from

[TextChannel](TextChannel.md).[nsfw](TextChannel.md#nsfw)

#### Defined in

[src/structures/GuildChannel.ts:9](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/GuildChannel.ts#L9)

___

### permissionOverwrites

• **permissionOverwrites**: `any`

#### Inherited from

[TextChannel](TextChannel.md).[permissionOverwrites](TextChannel.md#permissionoverwrites)

#### Defined in

[src/structures/GuildChannel.ts:7](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/GuildChannel.ts#L7)

___

### permissions

• **permissions**: `any`

#### Inherited from

[TextChannel](TextChannel.md).[permissions](TextChannel.md#permissions)

#### Defined in

[src/structures/GuildChannel.ts:10](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/GuildChannel.ts#L10)

___

### position

• **position**: `number`

#### Inherited from

[TextChannel](TextChannel.md).[position](TextChannel.md#position)

#### Defined in

[src/structures/GuildChannel.ts:6](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/GuildChannel.ts#L6)

___

### raw

• `Optional` **raw**: `APIChannel`

#### Inherited from

[TextChannel](TextChannel.md).[raw](TextChannel.md#raw)

#### Defined in

[src/structures/Channel.ts:7](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Channel.ts#L7)

___

### send

• **send**: (`options`: [`MessageOptions`](MessageOptions.md)) => `void`

#### Type declaration

▸ (`options`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`MessageOptions`](MessageOptions.md) |

##### Returns

`void`

#### Inherited from

[TextChannel](TextChannel.md).[send](TextChannel.md#send)

#### Defined in

[src/structures/TextChannel.ts:8](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/TextChannel.ts#L8)

___

### threadMetadata

• **threadMetadata**: `any`

#### Defined in

[src/structures/ThreadChannel.ts:6](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/ThreadChannel.ts#L6)

___

### topic

• **topic**: `string`

#### Inherited from

[TextChannel](TextChannel.md).[topic](TextChannel.md#topic)

#### Defined in

[src/structures/GuildChannel.ts:8](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/GuildChannel.ts#L8)

___

### type

• **type**: `any`

#### Inherited from

[TextChannel](TextChannel.md).[type](TextChannel.md#type)

#### Defined in

[src/structures/Channel.ts:5](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Channel.ts#L5)
