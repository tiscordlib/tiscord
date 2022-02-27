[tiscord](../README.md) / [Exports](../modules.md) / GuildChannel

# Class: GuildChannel

## Hierarchy

- [`Channel`](Channel.md)

  ↳ **`GuildChannel`**

  ↳↳ [`TextChannel`](TextChannel.md)

## Table of contents

### Constructors

- [constructor](GuildChannel.md#constructor)

### Properties

- [client](GuildChannel.md#client)
- [guildId](GuildChannel.md#guildid)
- [id](GuildChannel.md#id)
- [name](GuildChannel.md#name)
- [nsfw](GuildChannel.md#nsfw)
- [permissionOverwrites](GuildChannel.md#permissionoverwrites)
- [permissions](GuildChannel.md#permissions)
- [position](GuildChannel.md#position)
- [raw](GuildChannel.md#raw)
- [topic](GuildChannel.md#topic)
- [type](GuildChannel.md#type)

## Constructors

### constructor

• **new GuildChannel**(`client`, `data`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`Client`](Client.md) |
| `data` | `any` |

#### Overrides

[Channel](Channel.md).[constructor](Channel.md#constructor)

#### Defined in

[src/structures/GuildChannel.ts:11](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/GuildChannel.ts#L11)

## Properties

### client

• **client**: [`Client`](Client.md)

#### Inherited from

[Channel](Channel.md).[client](Channel.md#client)

#### Defined in

[src/structures/Channel.ts:9](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Channel.ts#L9)

___

### guildId

• **guildId**: `string`

#### Defined in

[src/structures/GuildChannel.ts:5](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/GuildChannel.ts#L5)

___

### id

• **id**: `string`

#### Inherited from

[Channel](Channel.md).[id](Channel.md#id)

#### Defined in

[src/structures/Channel.ts:6](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Channel.ts#L6)

___

### name

• **name**: `string`

#### Inherited from

[Channel](Channel.md).[name](Channel.md#name)

#### Defined in

[src/structures/Channel.ts:8](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Channel.ts#L8)

___

### nsfw

• **nsfw**: `boolean`

#### Defined in

[src/structures/GuildChannel.ts:9](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/GuildChannel.ts#L9)

___

### permissionOverwrites

• **permissionOverwrites**: `any`

#### Defined in

[src/structures/GuildChannel.ts:7](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/GuildChannel.ts#L7)

___

### permissions

• **permissions**: `any`

#### Defined in

[src/structures/GuildChannel.ts:10](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/GuildChannel.ts#L10)

___

### position

• **position**: `number`

#### Defined in

[src/structures/GuildChannel.ts:6](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/GuildChannel.ts#L6)

___

### raw

• `Optional` **raw**: `APIChannel`

#### Inherited from

[Channel](Channel.md).[raw](Channel.md#raw)

#### Defined in

[src/structures/Channel.ts:7](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Channel.ts#L7)

___

### topic

• **topic**: `string`

#### Defined in

[src/structures/GuildChannel.ts:8](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/GuildChannel.ts#L8)

___

### type

• **type**: `any`

#### Inherited from

[Channel](Channel.md).[type](Channel.md#type)

#### Defined in

[src/structures/Channel.ts:5](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Channel.ts#L5)
