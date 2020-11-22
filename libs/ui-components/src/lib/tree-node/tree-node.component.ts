import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TreeNodeEvent, TreeNodeSectionEvent, TreeNodeSection } from './tree-node.models';

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
          <bpa-tree-item
            [list]="section.children"
            (selected)="selectMenuItem(section, $event)"
            *ngIf="section.hasChildren">
          </bpa-tree-item>
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
  selectedMenu: EventEmitter<TreeNodeSectionEvent> = new EventEmitter<TreeNodeSectionEvent>(true);

  constructor() { }

  ngOnInit(): void {
  }

  selectSection(section: TreeNodeSection) {
    this.sections.forEach(s => s.updateActive(s.id === section.id));
    // TODO
  }

  selectMenuItem(section: TreeNodeSection, ev: TreeNodeEvent) {
    this.selectedMenu.emit(TreeNodeSectionEvent.cloneWith(section.place, ev));
  }
}
