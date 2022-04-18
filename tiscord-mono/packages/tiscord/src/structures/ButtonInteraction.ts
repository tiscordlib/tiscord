import { Client, RepliableInteraction } from '../';
import { APIMessageComponentButtonInteraction } from 'discord-api-types/v10';

/**
 * Represents a button interaction.
 * @extends {Interaction}
 * @property {string} customId - The custom id of the interaction.
 * @property {number} componentType - The component type of the interaction.
 */
export class ButtonInteraction extends RepliableInteraction {
    customId: string;
    componentType: number;
    constructor(client: Client, data: APIMessageComponentButtonInteraction) {
        super(client, data);
        this.customId = data.data.custom_id;
        this.componentType = data.data.component_type;
    }
}
