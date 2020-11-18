import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isNil } from '@blue-paper/shared-commons';

export interface IMessageText {
  kind?: 'error' | 'info'
  title?: string;
  text: string;
  closeable?: boolean;
}

/**
 * The component shows an message. If the attribute `closeable` is `true` then an button for close is shown.
 */
@Component({
  selector: 'bpa-message-panel',
  template: `
    <div class="message-panel" [ngClass]="messageKind" *ngIf="message">
      <button mat-icon-button (click)="executeClose()" *ngIf="hasCloseButton" class="message-button"><mat-icon svgIcon="close"></mat-icon></button>
      <h3 class="message-title" *ngIf="message.title">{{ message.title | translate }}</h3>
      <p class="message-text">{{ message.text | translate }}</p>
    </div>
  `,
  styleUrls: ['./message-panel.component.scss']
})
export class MessagePanelComponent implements OnInit {

  @Input()
  message: IMessageText;

  @Output()
  close: EventEmitter<void> = new EventEmitter<void>(true);

  get hasCloseButton(): boolean {
    return !isNil(this.message) && this.message.closeable === true;
  }

  get messageKind(): string {
    return !isNil(this.message) ? this.message.kind || 'info' : 'info';
  }

  constructor() { }

  ngOnInit(): void {
  }

  executeClose(): void {
    this.close.emit();
  }
}
