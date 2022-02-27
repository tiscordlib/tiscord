[tiscord](../README.md) / [Exports](../modules.md) / MessageManager

# Class: MessageManager

## Table of contents

### Constructors

- [constructor](MessageManager.md#constructor)

### Properties

- [channel](MessageManager.md#channel)
- [client](MessageManager.md#client)

### Methods

- [get](MessageManager.md#get)

## Constructors

### constructor

• **new MessageManager**(`client`, `channel`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`Client`](Client.md) |
| `channel` | [`TextChannel`](TextChannel.md) |

#### Defined in

[src/managers/MessageManager.ts:6](https://github.com/xiboon/tiscord/blob/2dcfba7/src/managers/MessageManager.ts#L6)

## Properties

### channel

• **channel**: [`TextChannel`](TextChannel.md)

#### Defined in

[src/managers/MessageManager.ts:5](https://github.com/xiboon/tiscord/blob/2dcfba7/src/managers/MessageManager.ts#L5)

___

### client

• **client**: [`Client`](Client.md)

#### Defined in

[src/managers/MessageManager.ts:4](https://github.com/xiboon/tiscord/blob/2dcfba7/src/managers/MessageManager.ts#L4)

## Methods

### get

▸ **get**(`message`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/managers/MessageManager.ts:10](https://github.com/xiboon/tiscord/blob/2dcfba7/src/managers/MessageManager.ts#L10)
