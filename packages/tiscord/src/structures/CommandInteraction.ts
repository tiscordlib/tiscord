import { Client, RepliableInteraction } from '../';

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
    commandType: number;
    name: string;
    commandId: string;
    constructor(client: Client, data: any) {
        super(client, data);
        this.commandId = data.data.id;
        this.name = data.data.name;
        // @ts-ignore
        this.commandType = data.data.type;
    }
}
