import { Client, CommandInteraction, Interaction } from '../';

export async function interactionCreate(client: Client, data: { d: any }) {
    if (data.d.type === 2) {
        client.emit('interactionCreate', new CommandInteraction(client, data.d));
    } else {
        client.emit('interactionCreate', new Interaction(client, data.d));
    }
}
