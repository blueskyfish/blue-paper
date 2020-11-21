import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TreeMenuEvent, TreeMenuItem } from './tree-node.models';

@Component({
  selector: 'bpa-tree-menu',
  template: `
    <ul class="tree-menu">
      <li class="menu-item" *ngFor="let item of list">
        <div class="caption">
          <button class="icon" mat-icon-button (click)="toggleMenuItem(item)">
            <mat-icon [svgIcon]="item.marker" class="marker"></mat-icon>
          </button>
          <div class="caption-text" matRipple (click)="selectMenuItem(item)">
            <mat-icon [svgIcon]="item.icon"></mat-icon>
            <p class="title">
              <span [matTooltip]="item.tooltip" matTooltipPosition="after">{{ item.path }}</span>
            </p>
          </div>
        </div>
        <div class="submenu" *ngIf="item.isExpanded">
          <bpa-tree-menu [list]="item.children" (selected)="childrenSelectMenu($event)"></bpa-tree-menu>
        </div>
      </li>
    </ul>
  `,
  styleUrls: ['./tree-menu.component.scss']
})
export class TreeMenuComponent {

  @Input()
  list: TreeMenuItem[] = [];

  @Output()
  selected: EventEmitter<TreeMenuEvent> = new EventEmitter<TreeMenuEvent>(true);

  toggleMenuItem(item: TreeMenuItem): void {
    if (item.isExpanded) {
      item.statusCollapsed();
    } else {
      item.statusExpanded();
    }
  }

  selectMenuItem(item: TreeMenuItem): void {
    if (!item.hasData && item.hasChildren) {
      this.toggleMenuItem(item);
    } else {
      this.selected.emit(new TreeMenuEvent(item.id, item.data));
    }
  }

  childrenSelectMenu(ev: TreeMenuEvent): void {
    this.selected.emit(ev);
  }
}
