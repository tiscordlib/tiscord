import { Client, DMChannel, GuildChannel, TextChannel, ThreadChannel, VoiceChannel } from '../';

import { APIGuildChannel } from 'discord-api-types/v10';

export async function channelCreate(client: Client, data: { d: APIGuildChannel<any> }) {
    let channel;
    switch (data.d.type) {
        case 0:
            channel = new TextChannel(client, data.d);
            break;
        case 1:
            channel = new DMChannel(client, data.d);
            break;
        case 2:
            channel = new VoiceChannel(client, data.d);
            break;
        case 10:
            channel = new ThreadChannel(client, data.d);
            break;
        case 11:
            channel = new ThreadChannel(client, data.d);
            break;
        case 12:
            channel = new ThreadChannel(client, data.d);
            break;
        case 13:
            channel = new VoiceChannel(client, data.d);
            break;
        default:
            channel = new GuildChannel(client, data.d);
            break;
    }
    if (channel.type !== 1) await channel.guilds();
    client.cache.channels.set(channel.id, channel);
    client.emit('channelCreate', channel);
}
