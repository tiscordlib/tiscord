/**
 * @property {number} size - Image size
 * @property {string} format - Image format
 * @property {boolean} dynamic - Whether the image is animated
 */
export declare interface ImageURLOptions {
    size?: number;
    format?: 'png' | 'jpg' | 'webp' | 'gif';
    dynamic?: boolean;
}
