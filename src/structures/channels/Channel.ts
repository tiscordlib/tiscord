import { APIChannel, ChannelType } from 'discord-api-types/v10';
import { Client } from '../../';

/**
 * Channel class
 *
 * @param {Client} client - Client instance
 * @param {APIChannel} data - Channel data
 * @class
 * @property {Client} client - Client instance
 * @property {bigint} id - Channel ID
 * @property {string} name - Channel name
 * @property {string} type - Channel type
 * @see https://discord.com/developers/docs/resources/channel#channel-object-channel-types
 * @property {APIChannel} raw - Raw channel data
 */
export class Channel {
    type: number;
    id: bigint;
    raw?: APIChannel;
    name: string;
    client: Client;
    constructor(client: Client, data: APIChannel) {
        this.id = BigInt(data.id);
        this.type = data.type;
        this.name = data.name;
        this.raw = data;
        this.client = client;
    }

    /**
     * @returns {boolean}
     */
    isThread() {
        return [ChannelType.GuildNewsThread, ChannelType.GuildPrivateThread, ChannelType.GuildPublicThread].includes(
            this.type
        );
    }

    /**
     * Indicates whether this channel is {@link TextBasedChannels text-based}.
     * @returns {boolean}
     */
    isTextBased() {
        return 'messages' in this;
    }

    /**
     * Indicates whether this channel is DM-based (either a {@link DMChannel} or a {@link PartialGroupDMChannel}).
     * @returns {boolean}
     */
    isDMBased() {
        return [ChannelType.DM, ChannelType.GroupDM].includes(this.type);
    }

    /**
     * Indicates whether this channel is {@link BaseGuildVoiceChannel voice-based}.
     * @returns {boolean}
     */
    isVoiceBased() {
        return 'bitrate' in this;
    }
}
