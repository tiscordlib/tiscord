import { Client, CommandInteraction, InteractionOptions } from '../../';

/**
 * Text input command interaction class
 * @param {Client} client - Client instance
 * @param {APIInteraction} data - Interaction data
 * @class
 * @property {InteractionOptions} options - Interaction options
 * @extends {CommandInteraction}
 */
export class ChatInputCommandInteraction extends CommandInteraction {
    options: InteractionOptions;
    constructor(client: Client, data: any) {
        super(client, data);
        this.options = new InteractionOptions(client, data.data.options, data.data.resolved, this.guild);
    }
}
