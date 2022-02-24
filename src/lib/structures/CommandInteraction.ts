import { APIApplicationCommandInteraction, ApplicationCommandType } from 'discord-api-types/v9';
import { Interaction } from './Interaction';

export class CommandInteraction extends Interaction {
    commandType: string;
    name: string;
    commandId: string;
    constructor(data: APIApplicationCommandInteraction) {
        super(data);
        this.commandId = data.data.id;
        this.name = data.data.name;
        this.commandType = ApplicationCommandType[data.data.type];
    }
}
