import { RequestManager } from './RequestManager.js';
import type { RESTClientOptions } from './RESTClient.js';
import { version } from './util.js';

export const DefaultDiscordOptions: RESTClientOptions = {
    baseURL: 'https://discord.com/api',
    version: 10,
    userAgent: `DiscordBot (https://github.com/tiscordilb/tiscord; ${version})`,
    headers: {}
};

export * from './APIRequest.js';
export * from './BucketQueueManager.js';
export * from './RequestManager.js';
export * from './RESTClient.js';
export * from './RESTError.js';
export * from './REST.js';

export { RequestManager as default, RequestManager as Client };
