/**
 * Regex for find the image size name in the query string
 *
 * The index **1** contains the image size name
 *
 * @type {RegExp}
 */
import { ImageUrlInfo } from '@blue-paper/shared-entities';

/**
 * Find the image size name in the query
 * @type {RegExp}
 */
export const QUERY_SIZE_PARAMS = /size=(fullwidth|gallery|preview|original)/;

/**
 * Find the css style names for the image
 * @type {RegExp}
 */
export const QUERY_STYLE_PARAMS = /style=([a-z,]+)/;

/**
 * The callback function for encrypting the image url with the image url entity
 */
export type EncryptImageUrlFunc = (data: ImageUrlInfo) => string;
