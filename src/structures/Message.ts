/* eslint-disable require-atomic-updates */
/* eslint-disable camelcase */
import { APIMessage } from 'discord-api-types/v10';
import { Client, User, Guild, APIError, TextChannel, MessageOptions, MessageTypes, SystemMessageTypes } from '../';
export class Message {
    id: string;
    channelId: string;
    guildId: string;
    author: User;
    timestamp: number;
    content: string;
    tts: boolean;
    mentions: any;
    mentionRoles: string[];
    mentionChannels: any;
    attachments: any;
    stickers: any;
    components: any;
    thread: any;
    interaction: any;
    referencedMessage: any;
    flags: any;
    messageReference: any;
    applicationId: string;
    type: any;
    webhookId: string;
    pinned: boolean;
    nonce: string | number;
    reactions: any;
    embeds: any;
    raw: any;
    reply: (data: MessageOptions) => Promise<unknown>;
    client: Client;
    guild: Guild;
    channel: TextChannel;
    constructor(client: Client, data: APIMessage) {
        console.log(client.api);
        this.client = client;
        this.id = data.id;
        console.log(this.client.api);
        this.channelId = data.channel_id;
        this.guildId = data.guild_id;
        this.author = new User(client, data.author);
        this.content = data.content;
        this.timestamp = new Date(data.timestamp).getTime() / 1000;
        this.tts = data.tts;
        this.mentions = data.mentions || [];
        this.mentionRoles = data.mention_roles || [];
        this.mentionChannels = data.mention_channels || [];
        this.attachments = data.attachments;
        this.embeds = data.embeds;
        this.reactions = data.reactions || [];
        this.nonce = data.nonce;
        this.pinned = data.pinned;
        this.webhookId = data.webhook_id;
        this.type = data.type;
        this.applicationId = data.application_id;
        this.messageReference = data.message_reference;
        this.flags = data.flags;
        this.referencedMessage = data.referenced_message;
        this.interaction = data.interaction;
        this.thread = data.thread;
        this.components = data.components;
        this.stickers = data.sticker_items;
        this.raw = data;
        this.reply = async (data: MessageOptions) => {
            if (SystemMessageTypes.includes(MessageTypes[this.type])) {
                throw new APIError('Cannot reply to system messages.');
            }
            data.replyTo = this.id;
            const res = this.channel.send(data);
            return res;
        };
    }
    async guilds() {
        this.guild = await this.client.guilds.get(this.guildId);
        this.channel = new TextChannel(this.client, (await this.guild.channels.get(this.channelId)).raw);
    }
}
