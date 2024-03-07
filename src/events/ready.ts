import { GatewayReadyDispatchData } from 'discord-api-types/v10';
import { Client, User } from '../';

export async function ready(client: Client, data: { d: GatewayReadyDispatchData }) {
    client.ws.sessionId = data.d.session_id;
    client.user = new User(client, data.d.user);
    client.ws.resumeGatewayUrl = data.d.resume_gateway_url;
    // data.d.guilds.map(g => new Guild(client, g));
    data.d.guilds.forEach((g: any) => {
        client.cache.guilds.set(BigInt(g.id), g);
    });

    client.debug('Received ready event from gateway', 'gateway');
    client.debug(`Bot user: ${client.user.username}#${client.user.discriminator}`, 'gateway');
    client.debug(`Bot guild count: ${client.cache.guilds.size}`, 'gateway');
    client._wsEvents.registerAll();
    client.emit('ready', client);
}
