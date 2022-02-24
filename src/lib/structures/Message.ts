import { MessageData } from '../util/MessageData'
import { Client } from '../client/Client'
import { fetch } from 'undici'
import { MessageOptions } from '../util/MessageOptions'
import { APIUser } from 'discord-api-types/v9'
export class Message {
    id: string
    channelId: string
    guildId: string
    author: APIUser
    timestamp: number
    content: string
    tts: boolean
    mentions: any
    mentionRoles: string[]
    mentionChannels: any
    attachments: any
    stickers: any
    components: any
    thread: any
    interaction: any
    referencedMessage: any
    flags: any
    messageReference: any
    applicationId: string
    type: any
    webhookId: string
    pinned: boolean
    nonce: string | number
    reactions: any
    embeds: any
    raw: any
    reply: (data: MessageOptions) => Promise<unknown>
    client: Client
    constructor(data: MessageData) {
        this.client = data.client
        this.id = data.id
        this.channelId = data.channel_id
        this.guildId = data.guild_id
        this.author = data.author
        this.content = data.content
        this.timestamp = new Date(data.timestamp).getTime() / 1000
        this.tts = data.tts
        this.mentions = data.mentions
        this.mentionRoles = data.mention_roles
        this.mentionChannels = data.mention_channels
        this.attachments = data.attachments
        this.embeds = data.embeds
        this.reactions = data.reactions
        this.nonce = data.nonce
        this.pinned = data.pinned
        this.webhookId = data.webhook_id
        this.type = data.type
        this.applicationId = data.application_id
        this.messageReference = data.message_reference
        this.flags = data.flags
        this.referencedMessage = data.referenced_message
        this.interaction = data.interaction
        this.thread = data.thread
        this.components = data.components
        this.stickers = data.sticker_items
        this.raw = data
        this.reply = async (data: MessageOptions) => {
            let parsedData = new MessageOptions(data)
            parsedData.message_reference = { message_id: this.id }
            const res = this.client.rest.post(`/channels/${this.channelId}/messages`, { body: parsedData })
            return res;
        }
    }
}