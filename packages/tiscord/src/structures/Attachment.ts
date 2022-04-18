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
export class Attachment {
    fileData: Buffer;
    fileName: string;
    id: number;
    discordData: any;
    constructor(data: Buffer, filename: string) {
        this.fileData = data;
        this.fileName = filename;
        this.discordData = {
            filename
        };
    }
}
