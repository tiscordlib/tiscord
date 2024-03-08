import { APIApplicationCommand } from "discord-api-types/v10";
import { ApplicationCommandOption } from "./ApplicationCommandOption";

/**
 * An application command.
 * @property {string} version - Autoincremented version identifier
 * @property {bigint} id - ID of the command
 * @property {number} type - Type of the command
 * @property {bigint} applicationId - ID of the application that owns the command
 * @property {bigint} guildId - ID of the guild that owns the command
 * @property {string} name - Name of the command
 * @property {Object} nameLocalizations - Localized names of the command
 * @property {string} description - Description of the command
 * @property {Object} descriptionLocalizations - Localized descriptions of the command
 * @property {ApplicationCommandOption[]} options - Options of the command
 * @property {string} defaultMemberPermissions - Default permissions needed to use the command
 * @property {boolean} dmPermission - Whether the command is enabled for DMs
 */
export class ApplicationCommand {
	version: string;
	id: bigint;
	type: any;
	applicationId: bigint;
	guildId: bigint;
	name: string;
	nameLocalizations: APIApplicationCommand["name_localizations"];
	description: string;
	descriptionLocalizations: APIApplicationCommand["description_localizations"];
	options: ApplicationCommandOption[];
	defaultMemberPermissions: string;
	dmPermission: boolean;
	constructor(data: APIApplicationCommand) {
		this.id = BigInt(data.id);
		this.type = data.type;
		this.applicationId = BigInt(data.application_id);
		if (data.guild_id) this.guildId = BigInt(data.guild_id);
		this.name = data.name;
		this.nameLocalizations = data.name_localizations;
		this.description = data.description;
		this.descriptionLocalizations = data.description_localizations;
		this.options = data.options.map((e) => new ApplicationCommandOption(e));
		this.defaultMemberPermissions = data.default_member_permissions;
		this.dmPermission = data.dm_permission;
		this.version = data.version;
	}
}
