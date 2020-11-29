import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PathParams, SubscriberList, toInt } from '@blue-paper/ui-commons';
import { MenuContent, MenuPanelEditEvent, NodeMenuIcon, TextContent } from '@blue-paper/ui-components';
import { map, switchMap, tap } from 'rxjs/operators';
import { MenuDetailStateService } from './menu-detail-state.service';

export const DEFAULT_ICON = 'file-outline';

@Component({
  selector: 'bpa-detail-view',
  templateUrl: './menu-detail-view.component.html',
  styleUrls: ['./menu-detail-view.component.scss'],
  providers: [
    MenuDetailStateService,
  ]
})
export class MenuDetailViewComponent implements OnInit, OnDestroy {

  private readonly subscriber$ = new SubscriberList();

  private _menuId: number;

  get menuId(): number {
    return this._menuId;
  }

  icon: string = DEFAULT_ICON;

  /**
   * The menu detail content
   * @type {MenuContent}
   */
  menu: MenuContent = null;

  /**
   * The text content for the menu
   * @type {TextContent}
   */
  text: TextContent = null;

  constructor(
    private route: ActivatedRoute,
    private menuDetailState: MenuDetailStateService
  ) { }

  ngOnInit(): void {

    // listen for the menu id in the path parameters
    this.subscriber$.add(
      this.route.paramMap
        .pipe(
          map((paramMap) => toInt(paramMap.get(PathParams.MenuId))),
          tap(menuId => this._menuId = menuId),
          switchMap(menuId => {
            return this.menuDetailState.getMenuDetailFrom$(menuId)
          })
        )
        .subscribe(([menu, text]) => {
          console.log('> Debug: menu detail =>', menu);
          this.menu = menu;
          this.text = text;
          try {
            this.icon = NodeMenuIcon[menu.template].collapsed;
          } catch (e) {
            this.icon = DEFAULT_ICON;
          }
        })
    );
  }

  ngOnDestroy() {
    this.subscriber$.unsubscribe();
  }

  /**
   * Save the menu detail content
   * @param {MenuPanelEditEvent} ev
   */
  menuChanged(ev: MenuPanelEditEvent): void {
    console.log('> Debug: Menu Panel =>', ev);

    if (ev.status === 'save') {
      this.menuDetailState.saveMenuDetail(this.menu.menuId, ev.menu);
    }
  }
}
