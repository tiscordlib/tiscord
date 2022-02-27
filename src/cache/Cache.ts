/**
 *  Cache for channels, message, etc.
 *  @class
 */

export class Cache {
    caches: Map<string, Map<string, any>>;
    constructor() {
        this.caches = new Map();
    }

    /**
     * @param {string} parent - parent map to get from
     * @param {string} object - object id to get
     * @memberof Cache
     * @returns {any}
     */
    get(parent: string, object: string): any {
        return this.caches.get(parent)?.get(object);
    }

    /**
     * @param {string} parent - parent map to set in
     * @param {any} object - object to set
     * @returns {void}
     */
    set(parent: string, object: any): void {
        if (!this.caches.has(parent)) this.caches.set(parent, new Map());
        this.caches.get(parent).set(object.id, object);
    }
}
