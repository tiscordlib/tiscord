import { Client, Guild, User } from '../';

export async function ready(client: Client, data: { d: any }) {
    client.ws.sessionId = data.d.session_id;
    client.user = new User(client, data.d.user);
    data.d.guilds.map(g => new Guild(client, g));
    data.d.guilds.forEach(g => {
        client.cache.guilds.set(g.id, g);
    });
    client.debug('Received ready event from gateway');
    client.debug(`Bot user: ${client.user.username}#${client.user.discriminator}`);
    client.debug(`Bot guild count: ${client.cache.guilds.size}`);
    client._wsEvents.registerAll();
    client.emit('ready', client);
}
