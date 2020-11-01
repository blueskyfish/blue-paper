/**
 * Regex for find the image size name in the query string
 *
 * The index **1** contains the image size name
 *
 * @type {RegExp}
 */
import { ImageUrlInfo } from '@blue-paper/shared-entities';

export const QUERY_SIZE_PARAMS = /size=(fullwidth|gallery|preview|original)/;

/**
 * The callback function for encrypting the image url with the image url entity
 */
export type EncryptImageUrlFunc = (data: ImageUrlInfo) => string;
