import { Client, Guild, Message, TextChannel } from '../';
import { APIMessage } from 'discord-api-types/v10';

export async function messageUpdate(client: Client, data: { d: APIMessage }) {
    const guild: Guild = client.cache.guilds.get(data.d.guild_id);
    const channel = (await guild.channels.get(data.d.channel_id)) as TextChannel;

    const oldMessage = client.cache.messages.get(channel.id, data.d.id);
    const newMessage = new Message(client, data.d);

    if (!oldMessage) return;
    await newMessage.guilds();

    client.cache.messages.set(newMessage.channelId, newMessage);
    client.emit('messageUpdate', oldMessage, newMessage);
}