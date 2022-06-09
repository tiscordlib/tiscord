import { Client, RepliableInteraction, SelectMenuOption } from '../../';

/**
 * Represents a select menu interaction.
 * @extends {Interaction}
 * @property {string} customId - The custom id of the interaction.
 * @property {number} componentType - The component type of the interaction.
 * @property {SelectMenuOption[]} values - The values selected by the creator    of the interaction.
 */
export class SelectMenuInteraction extends RepliableInteraction {
    customId: string;
    componentType: number;
    values: any;
    constructor(client: Client, data: any) {
        super(client, data);
        this.customId = data.data.custom_id;
        this.componentType = data.data.component_type;
        this.values = data.values?.map(value => new SelectMenuOption(value));
    }
}
