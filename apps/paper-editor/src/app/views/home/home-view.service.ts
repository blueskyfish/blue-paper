import { Injectable } from '@angular/core';
import { LogoutDialogService } from '../../dialogs/logout-dialog.service';

@Injectable()
export class HomeViewService {

  constructor(
    private logoutDialog: LogoutDialogService
  ) {
  }

  confirmLogout(): void {
    this.logoutDialog.confirmLogout()
      .subscribe((result) => console.log('> Debug: User logout %s', result));
  }
}
