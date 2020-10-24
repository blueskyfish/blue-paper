import { LogService } from '@blue-paper/server-commons';
import { IDbMenu, IRepositoryPool, MenuRepository, RepositoryService } from '@blue-paper/server-repository';
import { isNil } from '@blue-paper/shared-commons';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaperInfo } from '../models/paper-info';
import { PaperTemplates } from '../models/paper-templates';
import { HtmlData } from './html-data.provider';
import { HtmlIndexService } from './html-index.service';
import { PaperContext } from './paper.context';

const addMenu = (paperInfo: PaperInfo, menu: IDbMenu, active: boolean): void => {
  switch (menu.place) {
    case 'navbar':
      paperInfo.navbar.push({
        title: menu.title,
        pageUrl: menu.pageUrl,
        active,
      });
      break;
    case 'footer':
      paperInfo.footer.push({
        title: menu.title,
        pageUrl: menu.pageUrl,
        active,
      });
      break;
  }
}


/**
 * Handles the request of html pages.
 *
 * **Not public**: Only usage in this module
 */
@Injectable()
export class PaperService {

  constructor(
    private log: LogService,
    private repository: RepositoryService,
    private indexService: HtmlIndexService
  ) {
  }

  /**
   * Process the html page with the given paper context.
   *
   * @param {PaperContext} paperCtx the current paper context of the request
   */
  async processHtmlPage(paperCtx: PaperContext): Promise<void> {
    return await this.repository.execute<void>(async (rep: IRepositoryPool) => {

      // get paper info ()
      const paperInfo = await this.getPaperInfo(paperCtx.pageUrl, rep.menu);

      if (isNil(paperInfo) || isNil(paperInfo.template) || paperInfo.template === '') {
        throw new NotFoundException(`Page could not found`);
      }

      let data: HtmlData;

      switch (paperInfo.template) {
        case PaperTemplates.Index:
          data = await this.indexService.getData(paperInfo, rep);
          break;
        default:
          throw new NotFoundException(`Page provider not found`);
      }

      paperCtx.send(paperInfo.template || 'index', data);
    });
  }

  /**
   * Get the paper information.
   *
   * @param {string} currentUrl the page url
   * @param {MenuRepository} menuRepository
   * @returns {Promise<PaperInfo>} if returns null, the page url is not found
   * @private
   */
  private async getPaperInfo(currentUrl: string, menuRepository: MenuRepository): Promise<PaperInfo> {
    this.log.debug('Paper', `Current Page => ${currentUrl}`);

    let currentMenu: IDbMenu = null;

    // changeable page information
    const paperInfo = {
      id: 0,
      groupId: 0,
      template: 'index',
      title: '',
      navbar: [],
      footer: [],
    };

    const dbMenuList = await menuRepository.getMenuList();

    if (Array.isArray(dbMenuList)) {
      dbMenuList.forEach((menu: IDbMenu) => {
        if (menu.pageUrl === currentUrl) {

          // found the menu item !!
          currentMenu = menu;

          // Update paper info
          paperInfo.id = menu.id;
          paperInfo.groupId = menu.groupId;
          paperInfo.template = menu.template;
          paperInfo.title = menu.title;

          addMenu(paperInfo, menu, true);

        } else {

          // add to the menu lists "navbar" & "footer"
          addMenu(paperInfo, menu, false);
        }
      });
    }

    return isNil(currentMenu) ? null : { ...paperInfo };
  }
}
