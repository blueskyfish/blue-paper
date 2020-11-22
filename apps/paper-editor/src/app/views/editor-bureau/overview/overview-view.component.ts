import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bpa-overview-view',
  template: `
    <section class="view-page">
      <bpa-title-panel icon="bulletin-board" title="app.editorBureau.overview.title"></bpa-title-panel>
      <div class="view-body mat-body">
        <p>{{ 'app.editorBureau.overview.message' | translate }}</p>
      </div>
    </section>
  `,
  styleUrls: [ './overview-view.component.scss' ]
})
export class OverviewViewComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
