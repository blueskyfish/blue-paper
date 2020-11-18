import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { SubscriberList } from '@blue-paper/ui-commons';
import { idGenerator, TreeNodeEvent, TreeNodeSection } from '@blue-paper/ui-components';
import { debounceTime, filter } from 'rxjs/operators';
import { EditorBureauStateService } from './editor-bureau-state.service';

@Component({
  selector: 'bpa-editor-bureau-view',
  templateUrl: './editor-bureau-view.component.html',
  styleUrls: ['./editor-bureau-view.component.scss'],
  providers: [
    EditorBureauStateService,
  ]
})
export class EditorBureauViewComponent implements OnInit, OnDestroy {

  private readonly id = idGenerator();

  private readonly subscriber$ = new SubscriberList();

  menuPlaces: TreeNodeSection[] = null;

  constructor(private route: ActivatedRoute, private editorState: EditorBureauStateService) { }

  ngOnInit(): void {

    this.editorState.initView();

    this.subscriber$.add(
      this.editorState.getMenuList$.subscribe((menuPlaces) => {
        this.menuPlaces = menuPlaces;
        // select the first
        this.menuPlaces[0]?.updateActive(true);
      })
    );
  }

  ngOnDestroy() {
    this.subscriber$.unsubscribe();
  }

  selectMenuItem(ev: TreeNodeEvent): void {
    console.log('> Debug: Select menu =>', ev);
  }
}
