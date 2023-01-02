import type { APIChannel } from 'discord-api-types/v10';
import { ChannelType } from 'discord-api-types/v10';
import type { Client } from '../../';

/**
 * Channel class
 *
 * @param {Client} client - Client instance
 * @param {APIChannel} data - Channel data
 * @class
 * @property {Client} client - Client instance
 * @property {bigint} id - Channel ID
 * @property {string} name - Channel name
 * @property {number} type - Channel type
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
        this.client = client;
        this._patch(data);
    }
    _patch(data: APIChannel) {
        this.id ??= BigInt(data.id);
        if (this.client.raw) this.raw = data;
        if ('name' in data) this.name = data.name;
        if ('type' in data) this.type = data.type;
    }

    /**
     * Indicates whether this channel is a {@link ThreadChannel}.
     * @returns {boolean}
     */
    isThread() {
        return [ChannelType.GuildNewsThread, ChannelType.GuildPrivateThread, ChannelType.GuildPublicThread].includes(
            this.type
        );
    }

    /**
     * Indicates whether this channel is text-based.
     * @returns {boolean}
     */
    isTextBased() {
        return 'messages' in this;
    }

    /**
     * Indicates whether this channel is DM-based (either a {@link DMChannel}).
     * @returns {boolean}
     */
    isDMBased() {
        return [ChannelType.DM, ChannelType.GroupDM].includes(this.type);
    }

    /**
     * Indicates whether this channel is voice-based.
     * @returns {boolean}
     */
    isVoiceBased() {
        return 'bitrate' in this;
    }
}
