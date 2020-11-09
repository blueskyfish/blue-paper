import { Component, OnInit } from '@angular/core';
import { ToolButtonItem } from '@blue-paper/ui-components';

export enum HomeToolbarCommand {
  UserAccount = 'userAccount',
  Logout = 'logout',
  About = 'about'
}

@Component({
  selector: 'bpa-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {

  toolbar: ToolButtonItem[] = [
    {
      command: HomeToolbarCommand.UserAccount,
      icon: 'account-circle-outline',
      tooltip: 'app.error.toolbar.account.tooltip'
    },
    '-',
    {
      command: HomeToolbarCommand.About,
      icon: 'information-outline',
      tooltip: 'app.error.toolbar.about.tooltip'
    },
    {
      command: HomeToolbarCommand.Logout,
      icon: 'logout',
      tooltip: 'app.error.toolbar.logout.tooltip'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  toolbarExecute(command: string): void {
    console.log('>> Debug "%s"', command);
  }
}
