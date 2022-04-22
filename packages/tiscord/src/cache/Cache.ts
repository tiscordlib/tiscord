/**
 *  Cache for channels, message, etc.
 *  @class
 */

export class Cache<T> {
    caches: Map<string, Map<string, T>>;
    constructor() {
        this.caches = new Map();
    }

    /**
     * @param {string} parent - parent map to get from
     * @param {string} object - object id to get
     * @returns {any}
     */
    get(parent: string, object: string): T {
        return this.caches.get(parent)?.get(object);
    }

    /**
     * @param {string} parent - parent map to set in
     * @param {any} object - object to set
     * @returns {void}
     */
    set(parent: string, object: any): void {
        if (!this.caches.has(parent)) this.caches.set(parent, new Map());
        this.caches.get(parent).set(object.id || object.userId, object);
    }

    /**
     * @param {string} parent - Parent ID
     * @param {string} object - Object ID to delete
     * @returns {void}
     */
    delete(parent: string, object: string) {
        if (!this.caches.has(parent)) return;
        this.caches.get(parent).delete(object);
    }
}
