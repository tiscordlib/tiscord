[tiscord](../README.md) / [Exports](../modules.md) / CommandInteraction

# Class: CommandInteraction

## Hierarchy

- [`Interaction`](Interaction.md)

  ↳ **`CommandInteraction`**

## Table of contents

### Constructors

- [constructor](CommandInteraction.md#constructor)

### Properties

- [applicationId](CommandInteraction.md#applicationid)
- [channelId](CommandInteraction.md#channelid)
- [client](CommandInteraction.md#client)
- [commandId](CommandInteraction.md#commandid)
- [commandType](CommandInteraction.md#commandtype)
- [data](CommandInteraction.md#data)
- [guildId](CommandInteraction.md#guildid)
- [guildLocale](CommandInteraction.md#guildlocale)
- [id](CommandInteraction.md#id)
- [locale](CommandInteraction.md#locale)
- [name](CommandInteraction.md#name)
- [options](CommandInteraction.md#options)
- [raw](CommandInteraction.md#raw)
- [reply](CommandInteraction.md#reply)
- [token](CommandInteraction.md#token)
- [type](CommandInteraction.md#type)
- [user](CommandInteraction.md#user)

## Constructors

### constructor

• **new CommandInteraction**(`client`, `data`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`Client`](Client.md) |
| `data` | `any` |

#### Overrides

[Interaction](Interaction.md).[constructor](Interaction.md#constructor)

#### Defined in

[src/structures/CommandInteraction.ts:11](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/CommandInteraction.ts#L11)

## Properties

### applicationId

• **applicationId**: `string`

#### Inherited from

[Interaction](Interaction.md).[applicationId](Interaction.md#applicationid)

#### Defined in

[src/structures/Interaction.ts:7](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Interaction.ts#L7)

___

### channelId

• **channelId**: `string`

#### Inherited from

[Interaction](Interaction.md).[channelId](Interaction.md#channelid)

#### Defined in

[src/structures/Interaction.ts:15](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Interaction.ts#L15)

___

### client

• **client**: [`Client`](Client.md)

#### Inherited from

[Interaction](Interaction.md).[client](Interaction.md#client)

#### Defined in

[src/structures/Interaction.ts:18](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Interaction.ts#L18)

___

### commandId

• **commandId**: `string`

#### Defined in

[src/structures/CommandInteraction.ts:8](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/CommandInteraction.ts#L8)

___

### commandType

• **commandType**: `string`

#### Defined in

[src/structures/CommandInteraction.ts:6](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/CommandInteraction.ts#L6)

___

### data

• **data**: `any`

#### Inherited from

[Interaction](Interaction.md).[data](Interaction.md#data)

#### Defined in

[src/structures/Interaction.ts:14](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Interaction.ts#L14)

___

### guildId

• **guildId**: `string`

#### Inherited from

[Interaction](Interaction.md).[guildId](Interaction.md#guildid)

#### Defined in

[src/structures/Interaction.ts:9](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Interaction.ts#L9)

___

### guildLocale

• **guildLocale**: `string`

#### Inherited from

[Interaction](Interaction.md).[guildLocale](Interaction.md#guildlocale)

#### Defined in

[src/structures/Interaction.ts:16](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Interaction.ts#L16)

___

### id

• **id**: `string`

#### Inherited from

[Interaction](Interaction.md).[id](Interaction.md#id)

#### Defined in

[src/structures/Interaction.ts:10](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Interaction.ts#L10)

___

### locale

• **locale**: `string`

#### Inherited from

[Interaction](Interaction.md).[locale](Interaction.md#locale)

#### Defined in

[src/structures/Interaction.ts:17](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Interaction.ts#L17)

___

### name

• **name**: `string`

#### Defined in

[src/structures/CommandInteraction.ts:7](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/CommandInteraction.ts#L7)

___

### options

• **options**: `Map`<`string`, { `focused`: `boolean` ; `name`: `string` ; `options`: `any` ; `type`: `number` ; `value`: `any`  }\>

#### Defined in

[src/structures/CommandInteraction.ts:9](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/CommandInteraction.ts#L9)

___

### raw

• `Optional` **raw**: `APIInteraction`

#### Inherited from

[Interaction](Interaction.md).[raw](Interaction.md#raw)

#### Defined in

[src/structures/Interaction.ts:13](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Interaction.ts#L13)

___

### reply

• **reply**: (`options`: [`MessageOptions`](MessageOptions.md)) => `any`

#### Type declaration

▸ (`options`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`MessageOptions`](MessageOptions.md) |

##### Returns

`any`

#### Defined in

[src/structures/CommandInteraction.ts:10](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/CommandInteraction.ts#L10)

___

### token

• **token**: `string`

#### Inherited from

[Interaction](Interaction.md).[token](Interaction.md#token)

#### Defined in

[src/structures/Interaction.ts:11](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Interaction.ts#L11)

___

### type

• **type**: `string`

#### Inherited from

[Interaction](Interaction.md).[type](Interaction.md#type)

#### Defined in

[src/structures/Interaction.ts:8](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Interaction.ts#L8)

___

### user

• **user**: [`User`](User.md)

#### Inherited from

[Interaction](Interaction.md).[user](Interaction.md#user)

#### Defined in

[src/structures/Interaction.ts:12](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Interaction.ts#L12)
