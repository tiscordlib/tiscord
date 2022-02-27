import { APIMessage } from 'discord-api-types/v10';
import { Client } from '../client/Client';
export interface MessageData extends APIMessage {
    client: Client;
}
