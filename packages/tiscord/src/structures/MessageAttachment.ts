/**
 * Attachment object
 * @param {Buffer} data - Attachment data
 * @param {string} filename - File name
 * @param {number} id - Attachment ID, you can set it to whatever you want.
 * @class
 * @property {Buffer} fileData - Attachment data
 * @property {string} fileName - File name
 * @property {any} discordData - data for discord
 */
export class MessageAttachment {
    data: Buffer;
    id: number;
    discordData: any;
    filename: string;
    constructor(data: Buffer, filename: string) {
        this.data = data;
        this.filename = filename;
        this.discordData = {
            filename
        };
    }
}
