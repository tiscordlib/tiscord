import {
	APIApplicationCommand,
	RESTPatchAPIApplicationCommandJSONBody,
} from "discord-api-types/v10";
import { Client } from "../client/Client";
import { ApplicationCommand } from "../structures/application/ApplicationCommand";

/**
 * Class that manages Application Commands
 * @property {Client} client - The client instance
 */
export class ApplicationCommandManager {
	client: Client;
	constructor(client: Client) {
		this.client = client;
	}

	/**
	 * Describe your function
	 * @param {boolean} withLocalizations - Whether to include localizations, defaults to false
	 * @return {ApplicationCommand[]}
	 */
	async getAll(withLocalizations = false) {
		return (
			(await this.client.rest.get(
				`/applications/${this.client.applicationId}/commands${
					withLocalizations ? "?with_localizations=true" : ""
				}`,
			)) as APIApplicationCommand[]
		).map((e) => new ApplicationCommand(e));
	}

	/**
	 * Get a command by its ID
	 * @param {string} id
	 * @return {ApplicationCommand}
	 */
	async get(id: string) {
		return new ApplicationCommand(
			await this.client.rest.get(
				`/applications/${this.client.applicationId}/commands/${id}`,
			),
		);
	}

	/**
	 * Edit a function by its ID
	 * @param {string} id
	 * @param {import('discord-api-types').RESTPatchAPIApplicationCommandJSONBody} command
	 * @return {ApplicationCommand}
	 */
	async edit(id: string, command: RESTPatchAPIApplicationCommandJSONBody) {
		return new ApplicationCommand(
			await this.client.rest.patch(
				`/applications/${this.client.applicationId}/commands/${id}`,
				{
					body: command,
				},
			),
		);
	}

	/**
	 * Delete a command by its ID
	 * @param {string} id
	 * @return {void}
	 */
	async delete(id: string) {
		return this.client.rest.delete(
			`/applications/${this.client.applicationId}/commands/${id}`,
		);
	}

	/**
	 * Bulk edit commands
	 * @param {APIApplicationCommand[]} commands - The commands to edit with.
	 * @return {ApplicationCommand[]}
	 */
	async bulkEdit(commands: APIApplicationCommand[]) {
		return (
			(await this.client.rest.put(
				`/applications/${this.client.applicationId}/commands`,
				{
					body: commands,
				},
			)) as APIApplicationCommand[]
		).map((e) => new ApplicationCommand(e));
	}

	/**
	 * Create a command
	 * @param {APIApplicationCommand} command - The command to create
	 * @return {ApplicationCommand}
	 */
	async create(command: APIApplicationCommand) {
		return new ApplicationCommand(
			await this.client.rest.post(
				`/applications/${this.client.applicationId}/commands`,
				{ body: command },
			),
		);
	}
}
