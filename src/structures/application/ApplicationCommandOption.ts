import type {
	APIApplicationCommandOption,
	APIApplicationCommandOptionChoice,
} from "discord-api-types/v10";

/**
 * Class representing an application command option.
 * @property {string} name - Name of the option
 * @property {number} type - Type of the option
 * @property {import('discord-api-types/v10').APIApplicationCommandOption.name_localizations} nameLocalizations - Localized names of the option
 * @property {string} description - Description of the option
 * @property {import('discord-api-types/v10').APIApplicationCommandOption.name_localizations} descriptionLocalizations - Localized descriptions of the option
 * @property {boolean} required - Whether the option is required
 * @property {any[]} choices - Choices available for the option
 * @property {ApplicationCommandOption[]} options - Options in the option, when a subcommand or subcommand group
 * @property {number[]} channelTypes - Channel types the option accepts,
 * @property {number} minValue - Minimum value for the option, if a number/integer
 * @property {number} maxValue - Maximum value for the option, if a number/integer
 * @property {number} minLength - Minimum length for the option, if a string
 * @property {number} maxLength - Maximum length for the option, if a string
 * @property {boolean} autocomplete - Whether the option has autocomplete enabled
 **/
export class ApplicationCommandOption {
	name: string;
	type: number;
	nameLocalizations: APIApplicationCommandOption["name_localizations"];
	description: string;
	descriptionLocalizations: APIApplicationCommandOption["name_localizations"];
	required: boolean;
	choices: any[];
	options: ApplicationCommandOption[];
	channelTypes: number[];
	minValue: number;
	maxValue: number;
	minLength: number;
	maxLength: number;
	autocomplete: boolean;
	constructor(data: APIApplicationCommandOption) {
		this.name = data.name;
		this.type = data.type;
		this.nameLocalizations = data.name_localizations;
		this.description = data.description;
		this.descriptionLocalizations = data.description_localizations;
		this.required = data.required;
		// @ts-expect-error
		if (data.choices)
			// @ts-expect-error
			this.choices = data.choices.map(
				(e) => new ApplicationCommandOptionChoice(e),
			);
		// @ts-expect-error
		this.options = data.options.map((e) => new ApplicationCommandOption(e));
		// @ts-expect-error
		this.channelTypes = data.channel_types;
		// @ts-expect-error
		this.minValue = data.min_value;
		// @ts-expect-error
		this.maxValue = data.max_value;
		// @ts-expect-error
		this.minLength = data.min_length;
		//  @ts-expect-error
		this.maxLength = data.max_length;
		// @ts-expect-error
		this.autocomplete = data.autocomplete;
	}
}

/**
 * Application Command option choice
 * @property {string} name - Name of the choice
 * @property {import('discord-api-types/v10').APIApplicationCommandOptionChoice.name_localizations} nameLocalizations - Localized names of the choice
 * @property {any} value - Value of the choice
 **/
export class ApplicationCommandOptionChoice {
	name: string;
	nameLocalizations: APIApplicationCommandOptionChoice["name_localizations"];
	value: any;
	constructor(data: APIApplicationCommandOptionChoice) {
		this.name = data.name;
		this.nameLocalizations = data.name_localizations;
		this.value = data.value;
	}
}
