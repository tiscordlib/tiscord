import { APIModalActionRowComponent, APIModalSubmission, ModalSubmitComponent } from 'discord-api-types/v10';
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

    // TOOD: fix the repetitive code lol 
    async reply(options: RawMessageOptions) {
        const parsedData = new MessageOptions(options);
        let i = 0;
        let discordI = 0;
        const files = parsedData.attachments;
        if (parsedData.files) files.concat(parsedData.files);
        files?.map(a => {
            a.id = i;
            i++;
            return a;
        });

        parsedData.attachments = parsedData?.attachments?.map(a => {
            a.discordData.id = discordI;
            discordI++;
            return a.discordData;
        });
        const data: any = {
            body: { data: parsedData, type: 4 }
        }
        if (files) {
            data.files = files;
        }
        const res = this.client.rest.post(`/interactions/${this.id}/${this.token}/callback`, data);
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
        const parsedData = new MessageOptions(options);
        let i = 0;
        let discordI = 0;
        const files = parsedData.attachments;
        if (parsedData.files) files.concat(parsedData.files);
        files?.map(a => {
            a.id = i;
            i++;
            return a;
        });

        parsedData.attachments = parsedData?.attachments?.map(a => {
            a.discordData.id = discordI;
            discordI++;
            return a.discordData;
        });
        const data: any = {
            body: { data: parsedData, type: 4 },
        }
        if (files) {
            data.files = files;
        }
        this.client.rest.patch(`/webhooks/${this.client.user.id}/${this.token}/messages/@original`, data);
    }

    /**
     * Follow up to the original reply
     * @param options - Message options
     * @returns {FollowupMessage}
     */
    async followUp(options: RawMessageOptions) {
        const parsedData = new MessageOptions(options);
        let i = 0;
        let discordI = 0;
        const files = parsedData.attachments;
        if (parsedData.files) files.concat(parsedData.files);
        files?.map(a => {
            a.id = i;
            i++;
            return a;
        });

        parsedData.attachments = parsedData?.attachments?.map(a => {
            a.discordData.id = discordI;
            discordI++;
            return a.discordData;
        });
        const data: any = {
            body: parsedData,
        }
        if (files) {
            data.files = files;
        }
        options = new MessageOptions(options);
        return new FollowupMessage(
            this.client,
            this.client.rest.post(`/webhooks/${this.client.user.id}/${this.token}`, { body: options }),
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