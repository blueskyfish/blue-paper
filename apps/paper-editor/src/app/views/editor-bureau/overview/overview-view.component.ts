import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bpa-overview-view',
  template: `
    <section class="view-page">
      <h2 class="view-title">
        <mat-icon svgIcon="bulletin-board"></mat-icon>
        <span>{{ 'app.editorBureau.overview.title' | translate }}</span>
      </h2>
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
