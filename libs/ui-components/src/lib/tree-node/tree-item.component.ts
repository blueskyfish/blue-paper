import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TreeNodeEvent, TreeNodeItem } from './tree-node.models';

@Component({
  selector: 'bpa-tree-item',
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
          <bpa-tree-item [list]="item.children" (selected)="childrenSelectMenu($event)"></bpa-tree-item>
        </div>
      </li>
    </ul>
  `,
  styleUrls: ['./tree-item.component.scss']
})
export class TreeItemComponent {

  @Input()
  list: TreeNodeItem[] = [];

  @Output()
  selected: EventEmitter<TreeNodeEvent> = new EventEmitter<TreeNodeEvent>(true);

  toggleMenuItem(item: TreeNodeItem): void {
    if (item.isExpanded) {
      item.statusCollapsed();
    } else {
      item.statusExpanded();
    }
  }

  selectMenuItem(item: TreeNodeItem): void {
    if (item.isFolder && item.hasChildren) {
      this.toggleMenuItem(item);
    } else {
      this.selected.emit(new TreeNodeEvent(item.id, item.menu));
    }
  }

  childrenSelectMenu(ev: TreeNodeEvent): void {
    this.selected.emit(ev);
  }
}
