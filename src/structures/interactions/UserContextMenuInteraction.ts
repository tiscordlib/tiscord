import { APIUserApplicationCommandInteraction } from "discord-api-types/v10";
import { Client, CommandInteraction, Member, User } from "../../";

/**
 * Represents a user context menu command interaction.
 * @param {Client} client The client the interaction is for.
 * @param {APIUserApplicationCommandInteraction} interaction The interaction data.
 * @property {User} target The user the interaction is for.
 * @extends {CommandInteraction}
 */
export class UserContextMenuInteraction extends CommandInteraction {
	target: User;
	targetMember: Member;
	constructor(client: Client, data: APIUserApplicationCommandInteraction) {
		super(client, data);
		this.target = new User(
			client,
			data.data.resolved.users[data.data.target_id],
		);
		// @ts-expect-error
		this.targetMember = new Member(
			client,
			data.data.resolved.members[data.data.target_id],
			this.guild,
		);
	}
}
