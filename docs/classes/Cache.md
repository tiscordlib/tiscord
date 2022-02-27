[tiscord](../README.md) / [Exports](../modules.md) / Cache

# Class: Cache

 Cache for channels, message, etc.

## Table of contents

### Constructors

- [constructor](Cache.md#constructor)

### Properties

- [caches](Cache.md#caches)

### Methods

- [get](Cache.md#get)
- [set](Cache.md#set)

## Constructors

### constructor

• **new Cache**()

#### Defined in

[src/cache/Cache.ts:8](https://github.com/xiboon/tiscord/blob/2dcfba7/src/cache/Cache.ts#L8)

## Properties

### caches

• **caches**: `Map`<`string`, `Map`<`string`, `any`\>\>

#### Defined in

[src/cache/Cache.ts:7](https://github.com/xiboon/tiscord/blob/2dcfba7/src/cache/Cache.ts#L7)

## Methods

### get

▸ **get**(`parent`, `object`): `any`

**`memberof`** Cache

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parent` | `string` | parent map to get from |
| `object` | `string` | object id to get |

#### Returns

`any`

#### Defined in

[src/cache/Cache.ts:18](https://github.com/xiboon/tiscord/blob/2dcfba7/src/cache/Cache.ts#L18)

___

### set

▸ **set**(`parent`, `object`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parent` | `string` | parent map to set in |
| `object` | `any` | object to set |

#### Returns

`void`

#### Defined in

[src/cache/Cache.ts:27](https://github.com/xiboon/tiscord/blob/2dcfba7/src/cache/Cache.ts#L27)
