import { Component, OnInit } from '@angular/core';
import { ToolButtonItem } from '@blue-paper/ui-components';

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
    {
      icon: 'home',
      tooltip: 'Home'
    },
    '-',
    {
      icon: 'information-outline',
      tooltip: 'Info über ...'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
