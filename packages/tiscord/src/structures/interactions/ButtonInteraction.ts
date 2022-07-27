import { Client, Message, RawMessageOptions, RepliableInteraction } from '../../';
import { APIMessageComponentButtonInteraction } from 'discord-api-types/v10';
import { InteractionData } from '../../util/MessageOptions';

/**
 * Represents a button interaction.
 * @extends {Interaction}
 * @property {bigint} customId - The custom id of the interaction.
 * @property {number} componentType - The component type of the interaction.
 */
export class ButtonInteraction extends RepliableInteraction {
    customId: string;
    componentType: number;
    message: Message;
    constructor(client: Client, data: APIMessageComponentButtonInteraction) {
        super(client, data);
        this.customId = data.data.custom_id;
        this.componentType = data.data.component_type;
        this.message = new Message(client, data.message);
    }

    /**
     * Edit the original reply.
     * @param content - The content of the new message.
     */
    async editOriginalMessage(options: RawMessageOptions) {
        const parsedData = new InteractionData({ allowedMentions: this.client.allowedMentions, ...options }, 7);
        const res = this.client.rest.post(`/interactions/${this.id}/${this.token}/callback`, parsedData);
        return res;
    }
}
