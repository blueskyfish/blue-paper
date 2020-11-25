import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PathParams, SubscriberList, toInt } from '@blue-paper/ui-commons';
import { NodeMenuIcon } from '@blue-paper/ui-components';
import { BpaEditorMenuItem } from '@blue-paper/ui-editor-backend';
import { map, switchMap, tap } from 'rxjs/operators';
import { DetailStateService } from './detail-state.service';

export const DEFAULT_ICON = 'file-outline';

@Component({
  selector: 'bpa-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss'],
  providers: [
    DetailStateService,
  ]
})
export class DetailViewComponent implements OnInit, OnDestroy {

  private readonly subscriber$ = new SubscriberList();

  private _menuId: number;

  get menuId(): number {
    return this._menuId;
  }

  icon: string = DEFAULT_ICON;

  menuDetail: BpaEditorMenuItem;

  constructor(
    private route: ActivatedRoute,
    private detailState: DetailStateService
  ) { }

  ngOnInit(): void {

    this.subscriber$.add(
      this.route.paramMap
        .pipe(
          map((paramMap) => toInt(paramMap.get(PathParams.MenuId))),
          tap(menuId => this._menuId = menuId),
          switchMap(menuId => {
            return this.detailState.getMenuDetailFrom$(menuId)
          })
        )
        .subscribe((menuDetail) => {
          console.log('> Debug: menu detail =>', menuDetail);
          this.menuDetail = menuDetail;
          try {
            this.icon = NodeMenuIcon[menuDetail.template].collapsed;
          } catch (e) {
            this.icon = DEFAULT_ICON;
          }
        })
    );
  }

  ngOnDestroy() {
    this.subscriber$.unsubscribe();
  }
}
