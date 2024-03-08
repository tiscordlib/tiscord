/**
 * CDN link options
 * @typedef {Object} CDNOptions
 * @property {number} size - Image size
 * @property {string} format - Image format
 */
export interface CDNOptions {
	size: number;
	format: "webp" | "png" | "jpg" | "gif";
}
