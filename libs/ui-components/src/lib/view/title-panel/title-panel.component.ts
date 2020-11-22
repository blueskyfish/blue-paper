import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bpa-title-panel',
  template: `
    <h2 class="title-panel">
      <mat-icon [svgIcon]="icon" class="icon"></mat-icon>
      <span class="title">{{ title | translate }}</span>
    </h2>
  `,
  styleUrls: ['./title-panel.component.scss']
})
export class TitlePanelComponent implements OnInit {

  @Input()
  icon: string;

  @Input()
  title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
