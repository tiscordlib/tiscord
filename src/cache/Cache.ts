/**
 *  Cache for channels, message, etc.
 *  @class
 */

export class Cache<T> {
	caches: Map<bigint, Map<bigint, T>>;
	constructor() {
		this.caches = new Map();
	}

	/**
	 * @param {bigint} parent - parent map to get from
	 * @param {bigint} object - object id to get
	 * @returns {any}
	 */
	get(parent: bigint, object: bigint): T {
		return this.caches.get(parent)?.get(object);
	}

	/**
	 * @param {bigint} parent - parent map to get from
	 */
	all(parent: bigint) {
		return this.caches.get(parent);
	}

	/**
	 * @param {bigint} parent - parent map to set in
	 * @param {any} object - object to set
	 * @returns {void}
	 */
	set(parent: bigint, object: T): void {
		if (!this.caches.has(parent)) this.caches.set(parent, new Map());
		// @ts-expect-error
		this.caches.get(parent).set(object.id || object.userId, object);
	}

	/**
	 * @param {bigint} parent - Parent ID
	 * @param {bigint} object - Object ID to delete
	 * @returns {void}
	 */
	delete(parent: bigint, object: bigint) {
		if (!this.caches.has(parent)) return;
		this.caches.get(parent).delete(object);
	}
}
