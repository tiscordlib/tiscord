import { RequestManager } from './RequestManager';
import { RESTClientOptions } from './RESTClient';
import { version } from './util';

export const DefaultDiscordOptions: RESTClientOptions = {
    baseURL: 'https://discord.com/api',
    version: 10,
    userAgent: `DiscordBot (https://github.com/tiscordilb/tiscord; ${version})`,
    headers: {}
};

export * from './APIRequest';
export * from './BucketQueueManager';
export * from './RequestManager';
export * from './RESTClient';
export * from './RESTError';
export * from './REST';

export { RequestManager as default, RequestManager as Client };
