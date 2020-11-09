import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToolButtonItem } from '@blue-paper/ui-components';
import { BpaLoginPayload } from '@blue-paper/ui-editor-backend';
import { UserFacadeService } from '@blue-paper/ui-store-editor';

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
      tooltip: 'app.toolbar.about.tooltip'
    }
  ];

  formLogin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private userFacade: UserFacadeService) { }

  ngOnInit(): void {
  }

  toolbarExecute(command: string): void {
    console.log('>> Debug: "%s"', command);
  }

  submitLoginCredentials(): void {
    const payload: BpaLoginPayload = this.formLogin.value;
    this.userFacade.login(payload);
  }
}
