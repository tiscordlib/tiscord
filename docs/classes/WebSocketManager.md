[tiscord](../README.md) / [Exports](../modules.md) / WebSocketManager

# Class: WebSocketManager

 Main websocket class.

**`param`** Client instance

## Table of contents

### Constructors

- [constructor](WebSocketManager.md#constructor)

### Properties

- [client](WebSocketManager.md#client)
- [intents](WebSocketManager.md#intents)
- [sequence](WebSocketManager.md#sequence)
- [token](WebSocketManager.md#token)
- [ws](WebSocketManager.md#ws)

### Methods

- [connect](WebSocketManager.md#connect)
- [identify](WebSocketManager.md#identify)

## Constructors

### constructor

• **new WebSocketManager**(`client`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`Client`](Client.md) |

#### Defined in

[src/client/Websocket.ts:15](https://github.com/xiboon/tiscord/blob/2dcfba7/src/client/Websocket.ts#L15)

## Properties

### client

• **client**: [`Client`](Client.md)

#### Defined in

[src/client/Websocket.ts:14](https://github.com/xiboon/tiscord/blob/2dcfba7/src/client/Websocket.ts#L14)

___

### intents

• **intents**: `number`

#### Defined in

[src/client/Websocket.ts:13](https://github.com/xiboon/tiscord/blob/2dcfba7/src/client/Websocket.ts#L13)

___

### sequence

• **sequence**: `any`

#### Defined in

[src/client/Websocket.ts:12](https://github.com/xiboon/tiscord/blob/2dcfba7/src/client/Websocket.ts#L12)

___

### token

• **token**: `string`

#### Defined in

[src/client/Websocket.ts:10](https://github.com/xiboon/tiscord/blob/2dcfba7/src/client/Websocket.ts#L10)

___

### ws

• **ws**: `WebSocket`

#### Defined in

[src/client/Websocket.ts:11](https://github.com/xiboon/tiscord/blob/2dcfba7/src/client/Websocket.ts#L11)

## Methods

### connect

▸ **connect**(): `void`

#### Returns

`void`

#### Defined in

[src/client/Websocket.ts:20](https://github.com/xiboon/tiscord/blob/2dcfba7/src/client/Websocket.ts#L20)

___

### identify

▸ **identify**(): `void`

#### Returns

`void`

#### Defined in

[src/client/Websocket.ts:52](https://github.com/xiboon/tiscord/blob/2dcfba7/src/client/Websocket.ts#L52)
