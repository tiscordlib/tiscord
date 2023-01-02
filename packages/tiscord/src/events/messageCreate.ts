import type { Client } from '../';
import { Message } from '../';
import type { APIMessage } from 'discord-api-types/v10';

export async function messageCreate(client: Client, data: { d: APIMessage }) {
    const message = new Message(client, data.d);
    await message.guilds();
    client.cache.messages.set(message.channelId, message);
    client.emit('messageCreate', message);
}
