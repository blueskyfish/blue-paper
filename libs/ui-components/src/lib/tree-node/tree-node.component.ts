import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TreeMenuEvent, TreeNodeSection } from './tree-node.models';

@Component({
  selector: 'bpa-tree-node',
  template: `
    <div class="tree-node">
      <section class="tree-section" *ngFor="let section of sections" [class.active]="section.active">
        <div class="caption" matRipple (click)="selectSection(section)">
          <mat-icon [svgIcon]="section.icon" class="icon"></mat-icon>
          <p class="title">{{ section.title | translate }}</p>
          <mat-icon [svgIcon]="section.active ? 'chevron-down' : 'chevron-up'" class="marker"></mat-icon>
        </div>
        <div class="menu-panel" *ngIf="section.active">
          <bpa-tree-menu [list]="section.children" (selected)="this.selectedMenu.emit($event)" *ngIf="section.hasChildren"></bpa-tree-menu>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./tree-node.component.scss']
})
export class TreeNodeComponent implements OnInit {

  @Input()
  sections: TreeNodeSection[] = [];

  @Output()
  selectedMenu: EventEmitter<TreeMenuEvent> = new EventEmitter<TreeMenuEvent>(true);

  constructor() { }

  ngOnInit(): void {
  }

  selectSection(section: TreeNodeSection) {
    this.sections.forEach(s => s.updateActive(s.id === section.id));
    // TODO
  }
}
