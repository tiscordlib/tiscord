import 'dotenv/config';
import { Message, Client, CommandInteraction } from './lib';
const client = new Client({ token: process.env.TOKEN, intents: 513 });
process.on('uncaughtException', err => {
    console.error(err);
});
client.on('ready', async () => {
    console.log('Ready!');
});
client.on('message', async (message: Message) => {
    if (message.content.startsWith('hh!eval')) {
        if (message.author.id === '707675871355600967') {
            const code = eval(message.content.slice(7));
            await message.reply({
                content: code,
                allowedMentions: {
                    parse: []
                }
            });
        } else {
            message.reply({ content: 'ur not kubus lmfao', allowedMentions: { parse: [] } });
        }
    }
});
client.on('interaction', async (interaction: CommandInteraction) => {
    if (interaction.name === 'test') {
        const hi = interaction.options.get('hi');
        interaction.reply({ content: `you are ${hi.value}` });
    }
});
client.login();
