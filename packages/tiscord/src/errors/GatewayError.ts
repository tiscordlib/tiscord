/**
 * GatewayError
 * @class
 * @param {string} message - Error message
 */
export class GatewayError extends Error {
    constructor(message: string) {
        super(message);
    }
}
