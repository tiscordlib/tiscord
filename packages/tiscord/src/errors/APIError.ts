/**
 * APIError
 * @class
 * @param {string} message - Error message
 */
export class APIError extends Error {
    constructor(message: string) {
        super(message);
    }
}
