import { LogService } from '@blue-paper/server-commons';
import { ImageSize } from '@blue-paper/server-image-commons';
import { isNil } from '@blue-paper/shared-commons';
import { ImageUrlInfo } from '@blue-paper/shared-entities';
import { MarkedOptions, Renderer } from 'marked';
import { EncryptImageUrlFunc, QUERY_SIZE_PARAMS, QUERY_STYLE_PARAMS } from './renderer.config';

const IMAGE_RENDER_GROUP = 'ImageRenderer';

interface IFindImage {
  imageUrl: string;
  size: string;
  style: string[];
}

export class ImageRenderer extends Renderer {

  constructor(
    options: MarkedOptions,
    private log: LogService,
    private sourceList: ImageUrlInfo[],
    private encryptImageUrl: EncryptImageUrlFunc
  ) {
    super(options);
  }

  image(href: string | null, title: string | null, text: string): string {
    const value = this.findImageAndBuildUrl(href);
    if (isNil(value)) {
      // not found the image url info bean.
      return text;
    }

    const styles = [value.size, ...value.style];

    const imageText = super.image(value.imageUrl, title, text);
    return imageText.replace(/>|\/>/, (closeTag) => {
      return ` class="${styles.join(' ')}" ${closeTag}`;
    });
  }

  private findImageAndBuildUrl(href: string): IFindImage {

    const urlParts = href.split('?');
    // this.log.debug(IMAGE_RENDER_GROUP, `Find Image (${JSON.stringify(urlParts)})`);

    const urlImage = urlParts[0];
    const urlQueries = urlParts[1];

    this.log.trace(IMAGE_RENDER_GROUP, `image url (${urlImage}?${isNil(urlQueries) ? '-' : urlQueries}`);

    const imageUrlInfo = this.sourceList.find((info: ImageUrlInfo) => this.findFrom(info.imageUrl, urlImage));
    if (isNil(imageUrlInfo)) {
      // image url info is not found
      this.log.debug(IMAGE_RENDER_GROUP, `Image not found`);
      return null;
    }

    // Search for size query parameter (Default is "preview")
    let size: string = null
    if (!isNil(urlQueries)) {
      const exec = QUERY_SIZE_PARAMS.exec(urlQueries);
      if (exec && exec[1]) {
        size = exec[1];
        this.log.trace(IMAGE_RENDER_GROUP, `Image Size founded (size=${size})`);
      }
    }
    if (isNil(size)) {
      size = ImageSize.preview;
    }

    // Search for the stypes
    let styles = null;
    if (!isNil(urlQueries)) {
      const exec = QUERY_STYLE_PARAMS.exec(urlQueries);
      if (exec && exec[1]) {
        styles = exec[1];
      }
    }
    const style = isNil(styles) ? [] : styles.split(',');

    this.log.trace(IMAGE_RENDER_GROUP, `Found image ${imageUrlInfo.imageUrl}`);

    return {
      imageUrl: this.encryptImageUrl({ ...imageUrlInfo, size }),
      size,
      style,
    };
  }

  private findFrom = (imageUrl: string, url: string): boolean => {
    this.log.debug(IMAGE_RENDER_GROUP, `Compare ${imageUrl} <> ${url}`);
    const urlParts = url.split('/');
    const filename = urlParts[urlParts.length - 1];
    const prefix = urlParts.slice(0, urlParts.length - 1).join('/');

    return imageUrl.includes(prefix) && imageUrl.endsWith(filename);
  }
}
