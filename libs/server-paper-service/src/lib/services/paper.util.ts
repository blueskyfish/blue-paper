import { PaperInfo } from '@blue-paper/server-paper-service';
import { IDbMenu, MenuPlace } from '@blue-paper/server-repository';

export const PAPER_GROUP = 'Paper';

export const addMenu = (paperInfo: PaperInfo, menu: IDbMenu, active: boolean): void => {
  switch (menu.place) {
    case MenuPlace.Navbar:
      paperInfo.navbar.push({
        title: menu.title,
        pageUrl: menu.pageUrl,
        active,
      });
      break;
    case MenuPlace.Footer:
      paperInfo.footer.push({
        title: menu.title,
        pageUrl: menu.pageUrl,
        active,
      });
      break;
    default:
      break;
  }
}
