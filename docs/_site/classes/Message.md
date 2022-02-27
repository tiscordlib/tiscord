[tiscord](../README.md) / [Exports](../modules.md) / Message

# Class: Message

## Table of contents

### Constructors

- [constructor](Message.md#constructor)

### Properties

- [applicationId](Message.md#applicationid)
- [attachments](Message.md#attachments)
- [author](Message.md#author)
- [channel](Message.md#channel)
- [channelId](Message.md#channelid)
- [client](Message.md#client)
- [components](Message.md#components)
- [content](Message.md#content)
- [embeds](Message.md#embeds)
- [flags](Message.md#flags)
- [guild](Message.md#guild)
- [guildId](Message.md#guildid)
- [id](Message.md#id)
- [interaction](Message.md#interaction)
- [mentionChannels](Message.md#mentionchannels)
- [mentionRoles](Message.md#mentionroles)
- [mentions](Message.md#mentions)
- [messageReference](Message.md#messagereference)
- [nonce](Message.md#nonce)
- [pinned](Message.md#pinned)
- [raw](Message.md#raw)
- [reactions](Message.md#reactions)
- [referencedMessage](Message.md#referencedmessage)
- [reply](Message.md#reply)
- [stickers](Message.md#stickers)
- [thread](Message.md#thread)
- [timestamp](Message.md#timestamp)
- [tts](Message.md#tts)
- [type](Message.md#type)
- [webhookId](Message.md#webhookid)

### Methods

- [guilds](Message.md#guilds)

## Constructors

### constructor

• **new Message**(`client`, `data`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`Client`](Client.md) |
| `data` | `APIMessage` |

#### Defined in

[src/structures/Message.ts:36](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L36)

## Properties

### applicationId

• **applicationId**: `string`

#### Defined in

[src/structures/Message.ts:24](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L24)

___

### attachments

• **attachments**: `any`

#### Defined in

[src/structures/Message.ts:16](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L16)

___

### author

• **author**: [`User`](User.md)

#### Defined in

[src/structures/Message.ts:9](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L9)

___

### channel

• **channel**: [`TextChannel`](TextChannel.md)

#### Defined in

[src/structures/Message.ts:35](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L35)

___

### channelId

• **channelId**: `string`

#### Defined in

[src/structures/Message.ts:7](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L7)

___

### client

• **client**: [`Client`](Client.md)

#### Defined in

[src/structures/Message.ts:33](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L33)

___

### components

• **components**: `any`

#### Defined in

[src/structures/Message.ts:18](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L18)

___

### content

• **content**: `string`

#### Defined in

[src/structures/Message.ts:11](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L11)

___

### embeds

• **embeds**: `any`

#### Defined in

[src/structures/Message.ts:30](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L30)

___

### flags

• **flags**: `any`

#### Defined in

[src/structures/Message.ts:22](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L22)

___

### guild

• **guild**: [`Guild`](Guild.md)

#### Defined in

[src/structures/Message.ts:34](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L34)

___

### guildId

• **guildId**: `string`

#### Defined in

[src/structures/Message.ts:8](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L8)

___

### id

• **id**: `string`

#### Defined in

[src/structures/Message.ts:6](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L6)

___

### interaction

• **interaction**: `any`

#### Defined in

[src/structures/Message.ts:20](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L20)

___

### mentionChannels

• **mentionChannels**: `any`

#### Defined in

[src/structures/Message.ts:15](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L15)

___

### mentionRoles

• **mentionRoles**: `string`[]

#### Defined in

[src/structures/Message.ts:14](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L14)

___

### mentions

• **mentions**: `any`

#### Defined in

[src/structures/Message.ts:13](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L13)

___

### messageReference

• **messageReference**: `any`

#### Defined in

[src/structures/Message.ts:23](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L23)

___

### nonce

• **nonce**: `string` \| `number`

#### Defined in

[src/structures/Message.ts:28](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L28)

___

### pinned

• **pinned**: `boolean`

#### Defined in

[src/structures/Message.ts:27](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L27)

___

### raw

• **raw**: `any`

#### Defined in

[src/structures/Message.ts:31](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L31)

___

### reactions

• **reactions**: `any`

#### Defined in

[src/structures/Message.ts:29](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L29)

___

### referencedMessage

• **referencedMessage**: `any`

#### Defined in

[src/structures/Message.ts:21](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L21)

___

### reply

• **reply**: (`data`: [`MessageOptions`](MessageOptions.md)) => `Promise`<`unknown`\>

#### Type declaration

▸ (`data`): `Promise`<`unknown`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`MessageOptions`](MessageOptions.md) |

##### Returns

`Promise`<`unknown`\>

#### Defined in

[src/structures/Message.ts:32](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L32)

___

### stickers

• **stickers**: `any`

#### Defined in

[src/structures/Message.ts:17](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L17)

___

### thread

• **thread**: `any`

#### Defined in

[src/structures/Message.ts:19](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L19)

___

### timestamp

• **timestamp**: `number`

#### Defined in

[src/structures/Message.ts:10](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L10)

___

### tts

• **tts**: `boolean`

#### Defined in

[src/structures/Message.ts:12](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L12)

___

### type

• **type**: `any`

#### Defined in

[src/structures/Message.ts:25](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L25)

___

### webhookId

• **webhookId**: `string`

#### Defined in

[src/structures/Message.ts:26](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L26)

## Methods

### guilds

▸ **guilds**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/structures/Message.ts:73](https://github.com/xiboon/tiscord/blob/2dcfba7/src/structures/Message.ts#L73)
