import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NodeMenuEvent, NodeMenuItem } from './node-menu.models';

@Component({
  selector: 'bpa-menu-item',
  template: `
    <ul class="node-menu-list">
      <li class="menu-item" *ngFor="let item of list">
        <div class="caption" matRipple (click)="selectMenuItem(item)">
          <mat-icon [svgIcon]="item.icon" class="icon"></mat-icon>
          <p class="title">
            <span [matTooltip]="item.tooltip" matTooltipPosition="after">{{ item.title }}</span>
          </p>
        </div>
      </li>
    </ul>
  `,
  styleUrls: [ './menu-item.component.scss' ]
})
export class MenuItemComponent {

  /**
   * The list of node of menu items
   * @type {NodeMenuItem[]}
   */
  @Input()
  list: NodeMenuItem[] = [];

  @Output()
  selected: EventEmitter<NodeMenuEvent> = new EventEmitter<NodeMenuEvent>(true);

  toggleMenuItem(item: NodeMenuItem): void {
    if (item.isExpanded) {
      item.statusCollapsed();
    } else {
      item.statusExpanded();
    }
  }

  selectMenuItem(item: NodeMenuItem): void {
    this.selected.emit(new NodeMenuEvent(item.menu));
  }
}
