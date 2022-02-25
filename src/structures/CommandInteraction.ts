import { ApplicationCommandType } from 'discord-api-types/v9';
import { Client, MessageOptions } from '../';
import { Interaction } from './Interaction';

export class CommandInteraction extends Interaction {
    commandType: string;
    name: string;
    commandId: string;
    options: Map<string, { name: string; value: any; type: number; options: any; focused: boolean }>;
    reply: (options: MessageOptions) => any;
    constructor(client: Client, data: any) {
        super(client, data);
        this.commandId = data.data.id;
        this.name = data.data.name;
        this.commandType = ApplicationCommandType[data.data.type];
        this.options = new Map();
        data.data.options.forEach(
            (option: { name: string; value: any; type: number; options: any; focused: boolean }) => {
                this.options.set(option.name, option);
            }
        );
        this.reply = (options: MessageOptions) => {
            const res = this.client.rest.post(`/interactions/${this.id}/${this.token}/callback`, {
                body: { type: 4, data: options }
            });
            return res;
        };
    }
}
