import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NodeMenuEvent, NodeMenuSection } from './node-menu.models';

@Component({
  selector: 'bpa-node-section',
  template: `
    <div class="node-section-list">
      <section class="node-section" *ngFor="let section of sections" [class.active]="section.active">
        <div class="caption" matRipple (click)="selectSection(section)">
          <mat-icon [svgIcon]="section.icon" class="icon"></mat-icon>
          <p class="title">{{ section.title | translate }}</p>
          <mat-icon [svgIcon]="section.active ? 'chevron-down' : 'chevron-up'" class="marker"></mat-icon>
        </div>
        <div class="menu-panel" *ngIf="section.active">
          <bpa-menu-item
            [list]="section.children"
            (selected)="selectMenuItem($event)"
            *ngIf="section.hasChildren">
          </bpa-menu-item>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./node-section.component.scss']
})
export class NodeSectionComponent implements OnInit {

  @Input()
  sections: NodeMenuSection[] = [];

  @Output()
  selectedMenu: EventEmitter<NodeMenuEvent> = new EventEmitter<NodeMenuEvent>(true);

  constructor() { }

  ngOnInit(): void {
  }

  selectSection(section: NodeMenuSection) {
    this.sections.forEach(s => s.updateActive(s.place === section.place));
    // TODO
  }

  selectMenuItem(ev: NodeMenuEvent) {
    this.selectedMenu.emit(ev);
  }
}
