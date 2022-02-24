import 'dotenv/config';
import { Message } from "./lib/structures/Message";
import { Client } from "./lib/client/Client";
const client = new Client({ token: process.env.TOKEN, intents: 513 })

client.on('message', async (message: Message) => {
    if (message.content.startsWith('hh!eval')) {
        if (message.author.id === "707675871355600967") {
            const code = eval(message.content.slice(7))
            await message.reply({
                content: code,
                allowedMentions: {
                    parse: []
                }
            })
        } else {
            message.reply({ content: 'ur not kubus lmfao', allowedMentions: { parse: [] } })
        }
    }
})
client.login()