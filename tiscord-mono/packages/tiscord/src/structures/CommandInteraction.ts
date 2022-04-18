import { Client, InteractionOptions, RepliableInteraction } from '../';

import { ApplicationCommandType } from 'discord-api-types/v10';

/**
 * Command interaction class
 *
 *  @param {Client} client - Client instance
 *  @param {string} command - Command name
 *  @class
 *  @property {string} commandType - command type
 *  @property {string} name - command name
 *  @property {string} commandId - command id
 *  @property {InteractionOptions} options - Command option map
 *  @extends {RepliableInteraction}
 */
export class CommandInteraction extends RepliableInteraction {
    commandType: keyof typeof ApplicationCommandType;
    name: string;
    commandId: string;
    options: InteractionOptions;
    constructor(client: Client, data: any) {
        super(client, data);
        this.commandId = data.data.id;
        this.name = data.data.name;
        // @ts-ignore
        this.commandType = ApplicationCommandType[data.data.type];
        this.options = new InteractionOptions(client, data.data.options, data.data.resolved, this.guild);
    }
}
