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
    get(parent: bigint, object: bigint): void {
        return null;
    }

    /**
     * @param {string} parent - parent map to get from
     */
    all(parent: bigint): void {
        return null;
    }

    /**
     * @param {string} parent - parent map to set in
     * @param {any} object - object to set
     * @returns {void}
     */
    set(parent: bigint, object: any): void {
        return null;
    }

    /**
     * @param {bigint} parent - Parent ID
     * @param {bigint} object - Object ID to delete
     * @returns {void}
     */
    delete(parent: bigint, object: bigint): void {
        return null;
    }
}
