import { FollowupMessage, Interaction, MessageOptions, RawMessageOptions } from '../';

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
        options = new MessageOptions(options);
        const res = this.client.rest.post(`/interactions/${this.id}/${this.token}/callback`, {
            body: { type: 4, data: options }
        });
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
        options = new MessageOptions(options);
        this.client.rest.patch(`/webhooks/${this.client.user.id}/${this.token}/messages/@original`, {
            body: options
        });
    }

    /**
     * Follow up to the original reply
     * @param options - Message options
     * @returns {FollowupMessage}
     */
    async followUp(options: RawMessageOptions) {
        options = new MessageOptions(options);
        return new FollowupMessage(
            this.client,
            this.client.rest.post(`/webhooks/${this.client.user.id}/${this.token}`, { body: options }),
            this.token
        );
    }

    /**
    Delete a message.
*/
    async deleteReply() {
        await this.client.rest.delete(`/webhook/${this.client.user.id}/${this.token}/`);
    }
}
