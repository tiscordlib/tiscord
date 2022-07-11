import RESTManager, { RESTClient, RESTClientOptions } from '@fuwa/rest';
import { Client } from '../';

export class REST extends RESTManager {
    constructor(options: RESTClientOptions, client: Client) {
        super(new RESTClient(options), {
            logger: {
                debug: (...message) => {
                    client.debug(message, 'rest');
                },
                // empty character, so the header doesnt appear
                header: '‎'
            }
        });
    }
    async get(endpoint: `/${string}`, body?: any, reason?: string) {
        const res = await this.queue(endpoint, { ...body, method: 'GET', reason });
        return res.statusCode === 204 ? null : res.body.json();
    }
    async head(endpoint: `/${string}`, body?: any, reason?: string) {
        const res = await this.queue(endpoint, { ...body, method: 'HEAD', reason });
        return res.statusCode === 204 ? null : res.body.json();
    }
    async post(endpoint: `/${string}`, body?: any, reason?: string) {
        const res = await this.queue(endpoint, { ...body, method: 'POST', reason, payloadJson: true });
        return res.statusCode === 204 ? null : res.body.json();
    }
    async put(endpoint: `/${string}`, body?: any, reason?: string) {
        const res = await this.queue(endpoint, { ...body, method: 'PUT', reason });
        return res.statusCode === 204 ? null : res.body.json();
    }
    async delete(endpoint: `/${string}`, body?: any, reason?: string) {
        const res = await this.queue(endpoint, { ...body, method: 'DELETE', reason });
        return res.statusCode === 204 ? null : res.body.json();
    }
    async connect(endpoint: `/${string}`, body?: any, reason?: string) {
        const res = await this.queue(endpoint, { ...body, method: 'CONNECT', reason });
        return res.statusCode === 204 ? null : res.body.json();
    }
    async patch(endpoint: `/${string}`, body?: any, reason?: string) {
        const res = await this.queue(endpoint, { ...body, method: 'PATCH', reason, payloadJson: true });
        return res.statusCode === 204 ? null : res.body.json();
    }
}
