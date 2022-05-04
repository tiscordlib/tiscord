import RESTManager, { RESTClient, RESTClientOptions } from '@fuwa/rest';

export class REST extends RESTManager {
    constructor(options: RESTClientOptions /* client: Client */) {
        super(new RESTClient(options), {});
    }
    async get(endpoint: `/${string}`, body?: any, reason?: string) {
        const res = await this.queue(endpoint, { ...body, method: 'GET', reason });
        return res.body.json();
    }
    async head(endpoint: `/${string}`, body?: any, reason?: string) {
        const res = await this.queue(endpoint, { ...body, method: 'HEAD', reason });
        return res.body.json();
    }
    async post(endpoint: `/${string}`, body?: any, reason?: string) {
        const res = await this.queue(endpoint, { ...body, method: 'POST', reason });
        return res.body.json();
    }
    async put(endpoint: `/${string}`, body?: any, reason?: string) {
        const res = await this.queue(endpoint, { ...body, method: 'PUT', reason });
        return res.body.json();
    }
    async delete(endpoint: `/${string}`, body?: any, reason?: string) {
        const res = await this.queue(endpoint, { ...body, method: 'DELETE', reason });
        return res.body.json();
    }
    async connect(endpoint: `/${string}`, body?: any, reason?: string) {
        const res = await this.queue(endpoint, { ...body, method: 'CONNECT', reason });
        return res.body.json();
    }
    async options(endpoint: `/${string}`, body?: any, reason?: string) {
        const res = await this.queue(endpoint, { ...body, method: 'OPTIONS', reason });
        return res.body.json();
    }
    async patch(endpoint: `/${string}`, body?: any, reason?: string) {
        const res = await this.queue(endpoint, { ...body, method: 'PATCH', reason });
        return res.body.json();
    }
}
// this will be used once fuwa/rest is fixed
// eslint-disable-next-line
function DisabledKleurFactory() {
    const handler = () => (v: any) => {
        if (v) return v;
        return new Proxy(
            {},
            {
                get: handler
            }
        );
    };
    return new Proxy(
        {},
        {
            get: handler
        }
    );
}
