import { Logger } from '@nestjs/common';

/**
 * The image size from the file.
 *
 * * The attribute is required and in the list of {@link IMAGE_SIZE_NAMES}
 * * Only of the attributes are required or use both.
 */
export interface ImageSizeEntity {
  name: string;
  width?: number;
  height?: number;
}

/**
 * The internal structure of the image size with the hash for the etag
 */
export interface ImageSizeValue {
  width?: number;
  height?: number;
  hash: string;
}

/**
 * The list of possible image size names.
 *
 * The names are case sensitiv
 */
export enum ImageSize {
  thumbnail = 'thumbnail',
  fullwidth = 'fullwidth',
  gallery = 'gallery',
  preview = 'preview',
}

/**
 * The list of image size names
 * @type {string[]}
 */
export const IMAGE_SIZE_NAMES = Object.keys(ImageSize);

/**
 * Check if the size name as string in the list of image size names.
 *
 * @param {string} name the name
 * @returns {boolean} `true` means: it is in the list
 */
export function isSizeName(name: string): boolean {
  return IMAGE_SIZE_NAMES.indexOf(name) >= 0;
}

/**
 * The union of the image size names
 */
export type ImageSizeNameStrings = keyof typeof ImageSize;

/**
 * An dictionary of the image sizes
 */
export class ImageSizeDict {

  private readonly map: Map<ImageSizeNameStrings, ImageSizeValue> = new Map<ImageSizeNameStrings, ImageSizeValue>();

  constructor(private readonly defaultSizeValue: ImageSizeValue) {
  }

  add(entity: ImageSizeEntity, hash: string): void {
    const { name, height, width } = entity;

    if (isSizeName(name)) {
      this.map.set(name as ImageSizeNameStrings, { height, width, hash});
      return;
    }
    Logger.warn(`Unknown image size name "${name}"`, 'ImageSize');
  }

  get(name: string): ImageSizeValue {
    if (!isSizeName(name)) {
      Logger.debug(`Unknown image size name "${name}"`, 'ImageSize');
      return this.defaultSizeValue;
    }
    return this.map.get(name as ImageSizeNameStrings) || this.defaultSizeValue;
  }

  toString(): string {
    const values = {};
    this.map.forEach(((value, key) => {
      values[key] = value;
    }));
    return `ImageSizeDict (${JSON.stringify(values)})`;
  }
}
