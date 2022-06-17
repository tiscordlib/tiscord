import { MessageData } from '../../util/MessageOptions';
import { FollowupMessage, Interaction, RawMessageOptions } from '../../';

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

    async reply(options: RawMessageOptions) {
        const parsedData = new MessageData({ allowedMentions: this.client.allowedMentions, ...options });
        const res = this.client.rest.post(`/interactions/${this.id}/${this.token}/callback`, parsedData);
        return res;
    }

    /**
     * Defer the message
     * @param ephemeral - Whether the defer should be ephemeral
     * @returns {Promise<any>}
     */
    async defer(ephemeral?: boolean) {
        const res = this.client.rest.post(`/interactions/${this.id}/${this.token}/callback`, {
            body: { type: 5, data: { flags: ephemeral ? 64 : 0 } }
        });
        return res;
    }

    /**
     * Edit the original reply.
     * @param options - Message options
     * @returns {void}
     */
    async editReply(options: RawMessageOptions) {
        const parsedData = new MessageData({ allowedMentions: this.client.allowedMentions, ...options });
        this.client.rest.patch(`/webhooks/${this.client.user.id}/${this.token}/messages/@original`, parsedData);
    }

    /**
     * Follow up to the original reply
     * @param options - Message options
     * @returns {FollowupMessage}
     */
    async followUp(options: RawMessageOptions) {
        const parsedData = new MessageData({ allowedMentions: this.client.allowedMentions, ...options });
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
