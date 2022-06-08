import { APIAttachment } from "discord-api-types/v10";

/**
 * Represents an attachment.
 * @param {APIAttachment} attachment - Attachment data
 * @property {string} id - Attachment ID
 * @property {string} filename - Attachment filename
 * @property {string} description - Attachment description
 * @property {number} size - Attachment size
 * @property {string} url - Attachment url
 * @property {string} proxyUrl - Attachment proxy url
 * @property {string} [height] - Attachment height
 * @property {number} [width] - Attachment width
 * @property {boolean} ephemeral - Whether the attachment is ephemeral
 */
export class Attachment {
    ephemeral: boolean;
    id: string;
    filename: string;
    description: string;
    contentType: string;
    size: number;
    url: string;
    proxyUrl: string;
    height?: number;
    width?: number;
    constructor(data: APIAttachment) {
        this.id = data.id;
        this.filename = data.filename;
        this.description = data.description;
        this.contentType = data.content_type;
        this.size = data.size;
        this.url = data.url;
        this.proxyUrl = data.proxy_url;
        if (data.height) this.height = data.height;
        if (data.width) this.width = data.width;
        this.ephemeral = data.ephemeral;
    }
}