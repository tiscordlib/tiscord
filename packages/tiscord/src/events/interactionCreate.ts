import { ApplicationCommandType, ComponentType, InteractionType } from 'discord-api-types/v10';
import {
    ButtonInteraction,
    ChatInputCommandInteraction,
    Client,
    CommandInteraction,
    Interaction,
    MessageContextMenuInteraction,
    ModalInteraction,
    SelectMenuInteraction,
    UserContextMenuInteraction
} from '../';

export async function interactionCreate(client: Client, data: { d: any }) {
    let interaction;
    switch (data.d.type) {
        case InteractionType.ApplicationCommand:
            switch (data.d.data.type) {
                case ApplicationCommandType.ChatInput:
                    interaction = new ChatInputCommandInteraction(client, data.d);
                    break;
                case ApplicationCommandType.Message:
                    interaction = new MessageContextMenuInteraction(client, data.d);
                    break;
                case ApplicationCommandType.User:
                    interaction = new UserContextMenuInteraction(client, data.d);
                    break;
                default:
                    interaction = new CommandInteraction(client, data.d);
            }
            break;
        case InteractionType.MessageComponent:
            switch (data.d.data.component_type) {
                case ComponentType.Button:
                    interaction = new ButtonInteraction(client, data.d);
                    break;
                case ComponentType.SelectMenu:
                    interaction = new SelectMenuInteraction(client, data.d);
                    break;
                default:
                    interaction = new Interaction(client, data.d);
            }
            break;
        case InteractionType.ModalSubmit:
            interaction = new ModalInteraction(client, data.d);
            break;
        default:
            interaction = new Interaction(client, data.d);
    }
    client.emit('interactionCreate', interaction);
}
