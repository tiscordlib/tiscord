import { InteractionData } from '../../util/MessageOptions';
import { FollowupMessage, Interaction, Message, RawMessageOptions } from '../../';

/**
 * A interaction that can be replied to.
 * @extends {Interaction}
 */
export class RepliableInteraction extends Interaction {
    // eslint-disable-next-line lines-around-comment
    /**
     * Reply to the interaction
     * @param {MessageOptions} options - message options
     * @returns {Promise<any>}
     */

    async reply(options: RawMessageOptions): Promise<void> {
        const parsedData = new InteractionData({ allowedMentions: this.client.allowedMentions, ...options });
        this.client.rest.post(`/interactions/${this.id}/${this.token}/callback`, parsedData);
    }

    /**
     * Defer the message
     * @param ephemeral - Whether the defer should be ephemeral
     * @returns {Promise<any>}
     */
    async defer(ephemeral?: boolean): Promise<void> {
        this.client.rest.post(`/interactions/${this.id}/${this.token}/callback`, {
            body: { type: 5, data: { flags: ephemeral ? 64 : 0 } }
        });
    }

    /**
     * Defer the update of original response.
     * @param ephemeral - Whether the defer should be ephemeral
     * @returns {Promise<any>}
     */
    async deferUpdate(ephemeral?: boolean): Promise<void> {
        this.client.rest.post(`/interactions/${this.id}/${this.token}/callback`, {
            body: { type: 6, data: { flags: ephemeral ? 64 : 0 } }
        });
    }

    /**
     * Edit the original reply.
     * @param options - Message options
     * @returns {any}
     */
    async editReply(options: RawMessageOptions) {
        const parsedData = new InteractionData({ allowedMentions: this.client.allowedMentions, ...options });
        const message = new Message(
            this.client,
            await this.client.rest.patch(
                `/webhooks/${this.client.user.id}/${this.token}/messages/@original`,
                parsedData
            )
        );
        message.guilds();
        return message;
    }

    /**
     * Follow up to the original reply
     * @param options - Message options
     * @returns {FollowupMessage}
     */
    async followUp(options: RawMessageOptions) {
        const parsedData = new InteractionData({ allowedMentions: this.client.allowedMentions, ...options });
        return new FollowupMessage(
            this.client,
            this.client.rest.post(`/webhooks/${this.client.user.id}/${this.token}`, parsedData),
            this.token
        );
    }

    /**
        Delete the message.
    */
    async deleteReply() {
        await this.client.rest.delete(`/webhook/${this.client.user.id}/${this.token}/`);
    }

    /**
     * Get the original reply.
     * @returns {Promise<Message>}
     */
    async getReply(): Promise<Message> {
        const message = new Message(
            this.client,
            await this.client.rest.get(`/webhooks/${this.client.user.id}/${this.token}/messages/@original`)
        );
        message.guilds();
        return message;
    }

    /**
     * Reply with a modal
     * @param {APIModal} modal - The modal to reply with
     */
    async replyModal(modal: APIModal) {
        if (this.isModalSubmit()) throw new Error('Cannot reply with a modal to a modal submit');
        await this.client.rest.post(`/interactions/${this.id}/${this.token}/callback`, {
            body: { type: 9, data: modal }
        });
    }
}
export interface APIModal {
    title: string;
    custom_id?: string;
    components: any[];
}
