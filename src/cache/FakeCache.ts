/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * A class used to disable caching.
 */
export class FakeCache {
	/**
	 * @param {string} parent - parent map to get from
	 * @param {string} object - object id to get
	 * @returns {any}
	 */
	get(parent: bigint, object: bigint): void {}

	/**
	 * @param {string} parent - parent map to get from
	 */
	all(parent: bigint): void {}

	/**
	 * @param {string} parent - parent map to set in
	 * @param {any} object - object to set
	 * @returns {void}
	 */
	set(parent: bigint, object: unknown): void {}

	/**
	 * @param {bigint} parent - Parent ID
	 * @param {bigint} object - Object ID to delete
	 * @returns {void}
	 */
	delete(parent: bigint, object: bigint): void {}
}
