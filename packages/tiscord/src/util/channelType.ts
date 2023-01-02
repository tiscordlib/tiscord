import type { APIChannel } from 'discord-api-types/v10';
import { ChannelType } from 'discord-api-types/v10';
import type { Client } from '../';
import { Channel, DMChannel, TextChannel, ThreadChannel, VoiceChannel } from '../';

/**
 * Get the correct channel type. This is used to determine which channel class to call.
 * @param {Client} client The client.
 * @param {APIChannel} data The channel to get.
 */
export function channelType(client: Client, data: APIChannel): Channel {
    let channel;
    switch (data.type) {
        case ChannelType.GuildText:
            channel = new TextChannel(client, data);
            break;
        case ChannelType.DM:
            channel = new DMChannel(client, data);
            break;
        case ChannelType.GuildVoice:
            channel = new VoiceChannel(client, data);
            break;
        case ChannelType.GuildPublicThread:
            channel = new ThreadChannel(client, data);
            break;
        case ChannelType.GuildPrivateThread:
            channel = new ThreadChannel(client, data);
            break;
        case ChannelType.GuildNewsThread:
            channel = new ThreadChannel(client, data);
            break;
        case ChannelType.GuildStageVoice:
            // @ts-expect-error
            channel = new VoiceChannel(client, data);
            break;
        default:
            channel = new Channel(client, data);
            break;
    }
    return channel;
}
