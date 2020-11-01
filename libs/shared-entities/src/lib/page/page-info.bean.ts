import { ImageUrlInfo } from '../image';
import { LinkInfo } from './link-info.bean';
import { TocInfo } from './toc-info.bean';

/**
 * @deprecated
 */
export interface PageInfo {
  id: number;
  title: string;
  content: string;
  imageList: ImageUrlInfo[];
  tocList: TocInfo[];
  linkList: LinkInfo[];
}
