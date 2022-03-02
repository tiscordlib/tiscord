/**
 * Client options
 * @typedef {Object} ClientOptions
 * @property {string} token - Bot token
 * @property {number} intents - Gateway intents
 * @property {string} api - API version (defaults to 10)
 * @property {boolean} rawDataStorage - Whether to store raw data, turning it on might make ram usage a lot higher
 * @property {number} messageLifetime - How long to keep messages in cache (in seconds)
 * @property {number} messageSweepInterval - How often to sweep messages cache (in seconds)
 */
export interface ClientOptions {
    token: string;
    intents: number;
    api?: string;
    rawDataStorage?: boolean;
    messageLifetime?: number;
    sweepInterval?: number;
}
