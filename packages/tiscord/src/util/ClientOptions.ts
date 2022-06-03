import { CacheOptions } from './CacheOptions';
import { GatewayIntentBits } from 'discord-api-types/v10';

/**
 * Client options
 * @typedef {Object} ClientOptions
 * @property {string} token - Bot token
 * @property {(number|GatewayIntentBits[])} intents - Gateway intents
 * @property {number} api - API version (defaults to 10)
 * @property {boolean} rawDataStorage - Whether to store raw data, turning it on might make ram usage a lot higher
 * @property {number} messageLifetime - How long to keep messages in cache (in seconds)
 * @property {number} messageSweepInterval - How often to sweep messages cache (in seconds)
 * @property {CacheOptions} cache - Cache options
 * @property {boolean} debug - Whether to enable debug logs
 */
export interface ClientOptions {
    token: string;
    intents: number | Array<keyof typeof GatewayIntentBits>;
    api?: number;
    rawDataStorage?: boolean;
    cache?: CacheOptions;
    debug?: boolean;
}
