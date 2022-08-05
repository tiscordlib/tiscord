import { Client, Guild, User } from '../';

export async function ready(client: Client, data: { d: any }) {
    client.ws.sessionId = data.d.session_id;
    client.user = new User(client, data.d.user);
    data.d.guilds.map(g => new Guild(client, g));
    data.d.guilds.forEach((g: Guild) => {
        client.cache.guilds.set(g.id, g);
    });
    client.debug('Received ready event from gateway', 'gateway');
    client.debug(`Bot user: ${client.user.username}#${client.user.discriminator}`, 'gateway');
    client.debug(`Bot guild count: ${client.cache.guilds.size}`, 'gateway');
    client._wsEvents.registerAll();
    client.emit('ready', client);
}
