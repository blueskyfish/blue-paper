import { LogService } from '@blue-paper/server-commons';
import { getImageSizeNameFrom, ImageSizeName } from '@blue-paper/server-image-commons';
import { isNil } from '@blue-paper/shared-commons';
import { ImageUrlInfo } from '@blue-paper/shared-entities';
import { MarkedOptions, Renderer } from 'marked';
import { EncryptImageUrlFunc, QUERY_SIZE_PARAMS } from './renderer.config';

const IMAGE_RENDER_GROUP = 'ImageRenderer';

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
    const imageUrl = this.findImageAndBuildUrl(href);
    if (isNil(imageUrl)) {
      // not found the image url info bean.
      return text;
    }

    return super.image(imageUrl, title, text);
  }

  private findImageAndBuildUrl(href: string): string {

    const urlParts = href.split('?');
    this.log.debug(IMAGE_RENDER_GROUP, `Find Image (${JSON.stringify(urlParts)})`);

    const urlImage = urlParts[0];
    const urlQueries = urlParts[1];

    this.log.debug(IMAGE_RENDER_GROUP, `image url (${urlImage}${isNil(urlQueries) ? '-' : urlQueries}`);

    const imageUrlInfo = this.sourceList.find((info: ImageUrlInfo) => this.findFrom(info.imageUrl, urlImage));
    if (isNil(imageUrlInfo)) {
      // image url info is not found
      this.log.debug(IMAGE_RENDER_GROUP, `Image not found`);
      return null;
    }

    // Search for size query parameter (Default is "preview")
    let size: ImageSizeName = null
    if (!isNil(urlQueries)) {
      const exec = QUERY_SIZE_PARAMS.exec(urlQueries);
      if (exec && exec[1]) {
        size = getImageSizeNameFrom(exec[1]);
      }
    }

    if (isNil(size)) {
      size = ImageSizeName.Preview;
    }

    this.log.debug(IMAGE_RENDER_GROUP, `Found image ${imageUrlInfo.imageUrl}`);

    return this.encryptImageUrl({ ...imageUrlInfo, size });
  }

  findFrom = (imageUrl: string, url: string): boolean => {
    this.log.debug(IMAGE_RENDER_GROUP, `Compare ${imageUrl} <> ${url}`);
    const urlParts = url.split('/');
    const filename = urlParts[urlParts.length - 1];
    const prefix = urlParts.slice(0, urlParts.length - 1).join('/');

    return imageUrl.includes(prefix) && imageUrl.endsWith(filename);
  }
}
