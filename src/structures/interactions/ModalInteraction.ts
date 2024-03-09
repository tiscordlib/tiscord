import type { APIModalSubmitInteraction } from "discord-api-types/v10";
import { type Client, RepliableInteraction } from "../../";
import { ModalOptions } from "../../options/ModalOptions";

/**
 * A modal interaction
 * @param {Client} client - The client
 * @param {APIModalSubmitInteraction} data - The data
 * @property {bigint} customId - The custom id
 * @property {ModalOptions} options - The options
 */
export class ModalInteraction extends RepliableInteraction {
	customId: string;
	options: ModalOptions;
	constructor(client: Client, data: APIModalSubmitInteraction) {
		super(client, data);
		this.customId = data.data.custom_id;
		this.options = new ModalOptions(data.data.components);
	}
}
