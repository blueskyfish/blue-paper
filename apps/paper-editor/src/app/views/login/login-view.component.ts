import { Component, OnInit } from '@angular/core';
import { ToolButtonItem } from '@blue-paper/ui-components';

export enum LoginToolbarCommand {
  About = 'about',
}

@Component({
  selector: 'bpa-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  /**
   * Toolbar layout
   *
   * @type {ToolButtonItem[]}
   */
  toolbar: ToolButtonItem[] = [
    '-',
    {
      command: LoginToolbarCommand.About,
      icon: 'information-outline',
      tooltip: 'app.error.toolbar.about.tooltip'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
