import { Component, OnInit } from '@angular/core';
import { ToolButtonItem } from '@blue-paper/ui-components';
import { HomeViewService } from './home-view.service';

export enum HomeToolbarCommand {
  UserAccount = 'userAccount',
  Logout = 'logout',
  About = 'about'
}

@Component({
  selector: 'bpa-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
  providers: [
    HomeViewService,
  ]
})
export class HomeViewComponent implements OnInit {

  toolbar: ToolButtonItem[] = [
    {
      command: HomeToolbarCommand.UserAccount,
      icon: 'account-circle-outline',
      tooltip: 'app.toolbar.account.tooltip'
    },
    '-',
    {
      command: HomeToolbarCommand.About,
      icon: 'information-outline',
      tooltip: 'app.toolbar.about.tooltip'
    },
    {
      command: HomeToolbarCommand.Logout,
      icon: 'logout',
      tooltip: 'app.toolbar.logout.tooltip'
    }
  ]

  constructor(private homeState: HomeViewService) { }

  ngOnInit(): void {
  }

  toolbarExecute(command: string): void {
    switch (command) {
      case HomeToolbarCommand.Logout:
        this.homeState.confirmLogout();
        break;
      default:
        console.log('>> Debug: "%s"', command);
        break;
    }
  }
}
