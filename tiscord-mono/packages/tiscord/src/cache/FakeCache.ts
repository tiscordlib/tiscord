/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * A class used to disable caching.
 */
export class FakeCache {
    constructor() {
        return null;
    }

    /**
     * @param {string} parent - parent map to get from
     * @param {string} object - object id to get
     * @returns {any}
     */
    get(parent: string, object: string): void {
        return null;
    }

    /**
     * @param {string} parent - parent map to set in
     * @param {any} object - object to set
     * @returns {void}
     */
    set(parent: string, object: any): void {
        return null;
    }

    /**
     * @param {string} parent - Parent ID
     * @param {string} object - Object ID to delete
     * @returns {void}
     */
    delete(parent: string, object: string): void {
        return null;
    }
}
