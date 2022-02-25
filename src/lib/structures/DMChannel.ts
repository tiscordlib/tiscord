import { Client } from '../';
import { Channel } from './Channel';

export class DMChannel extends Channel {
    owner: any;
    lastMessageId: any;
    recipients: any;
    icon: any;
    ownerId: any;
    applicationId: any;
    constructor(client: Client, data: any) {
        super(client, data);
        this.owner = data.owner;
        this.lastMessageId = data.last_message_id;
        this.applicationId = data.application_id;
        this.ownerId = data.owner_id;
        this.icon = data.icon;
        this.recipients = data.recipients;
    }
}
