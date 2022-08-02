/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * A class used to disable caching.
 */
export class FakeMap<T> extends Map<bigint, T> {
    size: number;
    constructor() {
        super();
    }

    /**
     * @param {string} object - object id to get
     * @returns {any}
     */
    get(key: any): T {
        return null;
    }

    /**
     * @param {any} object - object to set
     * @returns {void}
     */
    set(key: any, value: T): any {
        return null;
    }

    /**
     * @param {string} object - Object ID to delete
     * @returns {void}
     */
    delete(key: bigint): boolean {
        return null;
    }
}
