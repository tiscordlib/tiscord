import type { APIMessageApplicationCommandInteraction } from "discord-api-types/v10";
import { type Client, CommandInteraction, Message } from "../../";

/**
 * Represents a message context menu command interaction.
 * @param {Client} client The client the interaction is for.
 * @param {APIUserApplicationCommandInteraction} interaction The interaction data.
 * @property {Message} target The user the interaction is for.
 * @extends {CommandInteraction}
 */
export class MessageContextMenuInteraction extends CommandInteraction {
	target: Message;
	constructor(client: Client, data: APIMessageApplicationCommandInteraction) {
		super(client, data);
		this.target = new Message(
			client,
			data.data.resolved.messages[data.data.target_id],
		);
	}
}
