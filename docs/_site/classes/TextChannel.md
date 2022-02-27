[tiscord](../README.md) / [Exports](../modules.md) / TextChannel

# Class: TextChannel

## Hierarchy

- [`GuildChannel`](GuildChannel.md)

  ↳ **`TextChannel`**

  ↳↳ [`ThreadChannel`](ThreadChannel.md)

## Table of contents

### Constructors

- [constructor](TextChannel.md#constructor)

### Properties

- [client](TextChannel.md#client)
- [defaultArchiveDuration](TextChannel.md#defaultarchiveduration)
- [guildId](TextChannel.md#guildid)
- [id](TextChannel.md#id)
- [lastMessageId](TextChannel.md#lastmessageid)
- [messages](TextChannel.md#messages)
- [name](TextChannel.md#name)
- [nsfw](TextChannel.md#nsfw)
- [permissionOverwrites](TextChannel.md#permissionoverwrites)
- [permissions](TextChannel.md#permissions)
- [position](TextChannel.md#position)
- [raw](TextChannel.md#raw)
- [send](TextChannel.md#send)
- [topic](TextChannel.md#topic)
- [type](TextChannel.md#type)

## Constructors

### constructor

• **new TextChannel**(`client`, `data`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`Client`](Client.md) |
| `data` | `any` |

#### Overrides

[GuildChannel](GuildChannel.md).[constructor](GuildChannel.md#constructor)

#### Defined in

[src/structures/TextChannel.ts:10](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/TextChannel.ts#L10)

## Properties

### client

• **client**: [`Client`](Client.md)

#### Inherited from

[GuildChannel](GuildChannel.md).[client](GuildChannel.md#client)

#### Defined in

[src/structures/Channel.ts:9](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Channel.ts#L9)

___

### defaultArchiveDuration

• **defaultArchiveDuration**: `any`

#### Defined in

[src/structures/TextChannel.ts:7](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/TextChannel.ts#L7)

___

### guildId

• **guildId**: `string`

#### Inherited from

[GuildChannel](GuildChannel.md).[guildId](GuildChannel.md#guildid)

#### Defined in

[src/structures/GuildChannel.ts:5](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/GuildChannel.ts#L5)

___

### id

• **id**: `string`

#### Inherited from

[GuildChannel](GuildChannel.md).[id](GuildChannel.md#id)

#### Defined in

[src/structures/Channel.ts:6](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Channel.ts#L6)

___

### lastMessageId

• **lastMessageId**: `any`

#### Defined in

[src/structures/TextChannel.ts:6](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/TextChannel.ts#L6)

___

### messages

• **messages**: [`MessageManager`](MessageManager.md)

#### Defined in

[src/structures/TextChannel.ts:9](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/TextChannel.ts#L9)

___

### name

• **name**: `string`

#### Inherited from

[GuildChannel](GuildChannel.md).[name](GuildChannel.md#name)

#### Defined in

[src/structures/Channel.ts:8](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Channel.ts#L8)

___

### nsfw

• **nsfw**: `boolean`

#### Inherited from

[GuildChannel](GuildChannel.md).[nsfw](GuildChannel.md#nsfw)

#### Defined in

[src/structures/GuildChannel.ts:9](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/GuildChannel.ts#L9)

___

### permissionOverwrites

• **permissionOverwrites**: `any`

#### Inherited from

[GuildChannel](GuildChannel.md).[permissionOverwrites](GuildChannel.md#permissionoverwrites)

#### Defined in

[src/structures/GuildChannel.ts:7](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/GuildChannel.ts#L7)

___

### permissions

• **permissions**: `any`

#### Inherited from

[GuildChannel](GuildChannel.md).[permissions](GuildChannel.md#permissions)

#### Defined in

[src/structures/GuildChannel.ts:10](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/GuildChannel.ts#L10)

___

### position

• **position**: `number`

#### Inherited from

[GuildChannel](GuildChannel.md).[position](GuildChannel.md#position)

#### Defined in

[src/structures/GuildChannel.ts:6](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/GuildChannel.ts#L6)

___

### raw

• `Optional` **raw**: `APIChannel`

#### Inherited from

[GuildChannel](GuildChannel.md).[raw](GuildChannel.md#raw)

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

#### Defined in

[src/structures/TextChannel.ts:8](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/TextChannel.ts#L8)

___

### topic

• **topic**: `string`

#### Inherited from

[GuildChannel](GuildChannel.md).[topic](GuildChannel.md#topic)

#### Defined in

[src/structures/GuildChannel.ts:8](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/GuildChannel.ts#L8)

___

### type

• **type**: `any`

#### Inherited from

[GuildChannel](GuildChannel.md).[type](GuildChannel.md#type)

#### Defined in

[src/structures/Channel.ts:5](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Channel.ts#L5)
