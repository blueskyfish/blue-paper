import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { isString } from '@blue-paper/shared-commons';
import { PathName } from '@blue-paper/ui-commons';
import { ToolButtonItem } from './toolbar.item';

interface ToolbarItem {
  divider: boolean;
  icon?: string;
  tooltip?: string;
}

@Component({
  selector: 'bpa-toolbar',
  template: `
    <aside class="toolbar sidebar">
      <ul class="toolbar-menu">
        <li *ngFor="let item of items" class="toolbar-item" [class.divider]="item.divider">
          <button mat-icon-button *ngIf="!item.divider" class="toolbar-button">
            <mat-icon [svgIcon]="item.icon" [matTooltip]="item.tooltip" matTooltipPosition="after" matTooltipShowDelay="100"></mat-icon>
          </button>
        </li>
      </ul>
    </aside>
  `,
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnChanges {

  @Input()
  toolbar: ToolButtonItem[];

  items: ToolbarItem[];

  @Input()
  disabled = false;

  @Output()
  execute: EventEmitter<ToolbarItem> = new EventEmitter<ToolbarItem>(true);

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.toolbar) {
      this.updateToolbarButtons(changes.toolbar.currentValue);
    }
  }

  onExecute(item: ToolbarItem): void {
    if (!this.disabled && item) {
      this.execute.emit(item);
    }
  }

  private updateToolbarButtons(toolbar: ToolButtonItem[]) {
    if (Array.isArray(toolbar)) {
      this.items = toolbar
        .map((item: ToolButtonItem) => {
          if (typeof item === 'string') {
            return {
              divider: true
            };
          }
          return {
            divider: false,
            icon: item.icon,
            tooltip: item.tooltip,
          };
        });
    }
  }
}
