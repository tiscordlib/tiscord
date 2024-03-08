/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * A class used to disable caching.
 */
export class FakeMap<T> extends Map<bigint, T> {
	size: number;

	/**
	 * @param {string} object - object id to get
	 * @returns {any}
	 */
	get(key: bigint): T {
		return null;
	}

	/**
	 * @param {any} object - object to set
	 * @returns {void}
	 */
	set(key: bigint, value: T): any {
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
