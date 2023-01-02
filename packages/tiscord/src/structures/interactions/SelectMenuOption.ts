/**
 * A select menu option.
 * @param {any} data - The data of the option.
 * @class
 * @property {string} label - The label of the option.
 * @property {any} value - The value of the option.
 * @property {string} description - The description of the option.
 * @property {string} imageUrl - The image url of the option.
 * @property {bigint} emojiId - The emoji id of the option.
 */
export class SelectMenuOption {
    label: string;
    value: string;
    description: string;
    imageUrl: string;
    emojiId: bigint;
    constructor(data: any) {
        this.label = data.label;
        this.value = data.value;
        this.description = data.description;
        this.imageUrl = data.image_url;
        this.emojiId = data.emoji?.id;
    }
}
