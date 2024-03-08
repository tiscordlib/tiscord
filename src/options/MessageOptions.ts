/* eslint-disable camelcase */
import {
	APIAllowedMentions,
	APIEmbed,
	APIMessageComponent,
	APIMessageReference,
} from "discord-api-types/v10";
import { AllowedMentions, MessageAttachment, RawMentions } from "../";

/**
 * Message options, used for parsing messages to an api readable format
 * @param {RawMessageOptions} data - Message data
 * @class
 * @property {string} content - Message content
 * @property {any[]} embeds - Message embeds
 * @property {APIAllowedMentions} allowed_mentions - Allowed mentions
 * @property {any[]} components - Message components
 * @property {string[]} sticker_ids - Sticker IDs
 * @property {number} flags - Message flags
 * @property {any} message_reference - Message reference
 * @property {Attachment[]} attachments - Message attachments
 * @property {Attachment[]} files - Message files
 */
export class MessageOptions {
	content?: string;
	embeds?: APIEmbed[];
	allowed_mentions?: APIAllowedMentions;
	components?: APIMessageComponent[];
	sticker_ids?: string[];
	flags?: number;
	message_reference?: APIMessageReference;
	attachments?: MessageAttachment[];
	files?: MessageAttachment[];
	constructor(data: RawMessageOptions) {
		if (typeof data.content !== "string" && data.content)
			throw new TypeError("`content` must be a string.");
		if (!data.content && !data.embeds && !data.attachments && !data.stickers)
			throw new TypeError(
				"`content`, `embeds`, `attachments` and `stickers` are all empty.",
			);
		this.content = data.content;
		if (data.embeds) this.embeds = data.embeds;
		if (data.allowedMentions)
			this.allowed_mentions = new AllowedMentions(data.allowedMentions);
		// @ts-expect-error
		if (data.replyTo) this.message_reference = { message_id: data.replyTo };
		if (data.components) this.components = data.components;
		if (data.stickers) this.sticker_ids = data.stickers;
		this.flags = data.flags || 0;
		if (data.attachments) this.attachments = data.attachments;
		if (data.files) this.files = data.files;
		if (data.ephemeral) this.flags += 64;
	}
}
export class MessageData {
	body: MessageOptions;
	files?: MessageAttachment[];
	constructor(messageData: RawMessageOptions) {
		const parsedData = new MessageOptions(messageData);
		let i = 0;
		let discordI = 0;
		const files = parsedData.attachments;
		if (parsedData.files) files.concat(parsedData.files);
		files?.map((a) => {
			a.id = i;
			i++;
			return a;
		});

		parsedData.attachments = parsedData?.attachments?.map((attachment) => {
			attachment.discordData.id = discordI;
			discordI++;
			return attachment.discordData;
		});
		this.body = parsedData;
		if (files) {
			this.files = files;
		}
	}
}
export class InteractionData {
	body: { data: MessageOptions; type: number };
	files?: MessageAttachment[];
	constructor(messageData: RawMessageOptions, type = 4) {
		const parsedData = new MessageOptions(messageData);
		let i = 0;
		let discordI = 0;
		const files = parsedData.attachments;
		if (parsedData.files) files.concat(parsedData.files);
		files?.map((a) => {
			a.id = i;
			i++;
			return a;
		});

		parsedData.attachments = parsedData?.attachments?.map((attachment) => {
			attachment.discordData.id = discordI;
			discordI++;
			return attachment.discordData;
		});
		this.body = { data: parsedData, type };
		if (files) {
			this.files = files;
		}
	}
}

/**
 * Message options type
 * @typedef {MessageOptions} MessageOptions
 * @property {string} content - Message content
 * @property {any[]} embeds - Message embeds
 * @property {APIAllowedMentions} allowedMentions - Allowed mentions
 * @property {any[]} components - Message components
 * @property {string[]} stickers - Sticker IDs
 * @property {number} flags - Message flags
 * @property {any} replyTo - Message reference
 * @property {boolean} ephemeral - Whether the message is ephemeral (Only for interactions)
 */
export interface RawMessageOptions {
	content?: string;
	embeds?: any[];
	allowedMentions?: RawMentions;
	attachments?: MessageAttachment[];
	files?: MessageAttachment[];
	components?: any[];
	stickers?: string[];
	flags?: number;
	replyTo?: any;
	ephemeral?: boolean;
}
