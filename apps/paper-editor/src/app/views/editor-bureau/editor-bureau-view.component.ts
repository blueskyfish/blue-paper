import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { SubscriberList } from '@blue-paper/ui-commons';
import { NodeMenuEvent, NodeMenuSection } from '@blue-paper/ui-components';
import { debounceTime, filter } from 'rxjs/operators';
import { EditorBureauStateService } from './editor-bureau-state.service';

@Component({
  selector: 'bpa-editor-bureau-view',
  template: `
    <section class="view">
      <div class="view-menu">
        <h2 class="title">{{ 'app.editorBureau.menu.title' | translate }}</h2>
        <div class="menu-tree-container">
          <bpa-node-section [sections]="menuList" (selectedMenu)="selectMenuItem($event)"></bpa-node-section>
        </div>
      </div>
      <div class="view-subview">
        <router-outlet></router-outlet>
      </div>
    </section>
  `,
  styleUrls: ['./editor-bureau-view.component.scss'],
  providers: [
    EditorBureauStateService,
  ]
})
export class EditorBureauViewComponent implements OnInit, OnDestroy {

  private readonly subscriber$ = new SubscriberList();

  menuList: NodeMenuSection[] = null;

  constructor(private route: ActivatedRoute, private editorState: EditorBureauStateService) { }

  ngOnInit(): void {

    this.editorState.initView();

    this.subscriber$.add(
      this.editorState.getMenuList$.subscribe((menuPlaces) => {
        this.menuList = menuPlaces;
        // select the first
        this.menuList[0]?.updateActive(true);
      })
    );
  }

  ngOnDestroy() {
    this.subscriber$.unsubscribe();
  }

  selectMenuItem(ev: NodeMenuEvent): void {
    this.editorState.navigateMenuDetail(ev.menu);
  }
}
