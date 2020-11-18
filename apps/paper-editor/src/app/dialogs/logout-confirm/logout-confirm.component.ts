import { Component } from '@angular/core';
import { DialogHandler } from '@blue-paper/ui-components';

export enum LogoutDialogResult {
  Cancel = 'cancel',
  Logout = 'logout',
}

@Component({
  selector: 'bpa-logout-confirm',
  template: `
    <div class="dialog">
      <h3 class="title">{{ 'app.logout-dialog.title' | translate }}</h3>
      <div class="content">
        <p>{{ 'app.logout-dialog.message' | translate }}</p>
      </div>
      <div class="command-bar">
        <button mat-raised-button class="button" (click)="cancel()">
          {{ 'app.command.cancel.title' | translate }}
        </button>
        <button mat-raised-button class="button" color="primary" (click)="logout()">
          {{ 'app.command.logout.title' | translate }}
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./logout-confirm.component.scss']
})
export class LogoutConfirmComponent {

  constructor(private handler: DialogHandler<void, LogoutDialogResult>) { }

  cancel(): void {
    this.handler.dismiss(LogoutDialogResult.Cancel);
  }

  logout(): void {
    this.handler.dismiss(LogoutDialogResult.Logout);
  }
}
