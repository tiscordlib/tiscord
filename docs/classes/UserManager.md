[tiscord](../README.md) / [Exports](../modules.md) / UserManager

# Class: UserManager

## Table of contents

### Constructors

- [constructor](UserManager.md#constructor)

### Properties

- [cache](UserManager.md#cache)
- [client](UserManager.md#client)

### Methods

- [get](UserManager.md#get)

## Constructors

### constructor

• **new UserManager**(`client`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`Client`](Client.md) |

#### Defined in

[src/managers/UserManager.ts:7](https://github.com/xiboon/tiscord/blob/2dcfba7/src/managers/UserManager.ts#L7)

## Properties

### cache

• **cache**: `Map`<`string`, [`User`](User.md)\>

#### Defined in

[src/managers/UserManager.ts:6](https://github.com/xiboon/tiscord/blob/2dcfba7/src/managers/UserManager.ts#L6)

___

### client

• **client**: [`Client`](Client.md)

#### Defined in

[src/managers/UserManager.ts:5](https://github.com/xiboon/tiscord/blob/2dcfba7/src/managers/UserManager.ts#L5)

## Methods

### get

▸ **get**(`id`, `fetch?`): `Promise`<[`User`](User.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `fetch?` | `any` |

#### Returns

`Promise`<[`User`](User.md)\>

#### Defined in

[src/managers/UserManager.ts:11](https://github.com/xiboon/tiscord/blob/2dcfba7/src/managers/UserManager.ts#L11)
