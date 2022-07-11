import { Client, Message, MessageOptions } from '../../';

/**
 * Represents a message that is a followup to an interaction
 * @extends {Message}
 * @param {Client} client - Client instance
 * @param {any} data - API message data
 * @param {string} token - Token of the interaction
 * @property {string} interactionToken - The token of the interaction
 */
export class FollowupMessage extends Message {
    interactionToken: string;
    constructor(client: Client, data: any, token: string) {
        super(client, data);
        this.interactionToken = token;
    }

    /**
     * Edit the message
     * @param newMessage - The new message data to send
     */
    async edit(newMessage: MessageOptions) {
        await this.client.rest.patch(`/webhook/${this.client.user.id}/${this.interactionToken}/`, {
            body: newMessage
        });
    }

    /**
        Delete a message.
    */
    async delete() {
        await this.client.rest.delete(`/webhook/${this.client.user.id}/${this.interactionToken}/`);
    }
}
