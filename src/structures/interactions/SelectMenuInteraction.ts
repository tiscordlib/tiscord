import {
	type Client,
	Message,
	type RawMessageOptions,
	RepliableInteraction,
	SelectMenuOption,
} from "../../";
import { InteractionData } from "../../options/MessageOptions";

/**
 * Represents a select menu interaction.
 * @extends {Interaction}
 * @property {bigint} customId - The custom id of the interaction.
 * @property {number} componentType - The component type of the interaction.
 * @property {SelectMenuOption[]} values - The values selected by the creator    of the interaction.
 */
export class SelectMenuInteraction extends RepliableInteraction {
	customId: bigint;
	componentType: number;
	values: any;
	message: Message;
	constructor(client: Client, data: any) {
		super(client, data);
		this.customId = data.data.custom_id;
		this.componentType = data.data.component_type;
		this.values = data.values?.map((value) => new SelectMenuOption(value));
		this.message = new Message(client, data.message);
	}

	/**
	 * Edit the original reply.
	 * @param content - The content of the new message.
	 */
	async updateReply(options: RawMessageOptions) {
		const parsedData = new InteractionData(
			{ allowedMentions: this.client.allowedMentions, ...options },
			7,
		);
		const res = this.client.rest.post(
			`/interactions/${this.id}/${this.token}/callback`,
			parsedData,
		);
		return res;
	}
}
