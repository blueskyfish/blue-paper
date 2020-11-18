import { isNil } from '@blue-paper/shared-commons';
import { Brand, HtmlData, PaperInfo } from './entities';


export const DEFAULT_BRAND: Brand = {
  logoUrl: 'assets/logo-black.svg',
  title: 'Hall Theme'
};


/**
 * Merges the attributes from {@link PaperInfo} and the other {@link HtmlData} to one entity
 *
 * @param {PaperInfo} paperInfo use the attribute `title`, `navbar` and `footer` from the paper information
 * @param {Partial<D>} data the other html data
 * @returns {Partial<D>}
 */
export const mergeFrom = <D extends HtmlData>(paperInfo: PaperInfo
                                              , data: Partial<D>): D => {
  const value = {
    title: paperInfo.title,
    navbar: Array.isArray(paperInfo.navbar) ? [...paperInfo.navbar] : [],
    footer: Array.isArray(paperInfo.footer) ? [...paperInfo.footer] : [],
    ...data,
  } as D;

  if (isNil(value.brand)) {
    value.brand = {...DEFAULT_BRAND};
  }

  return value;
}
