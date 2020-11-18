import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMessageText, ToolButtonItem } from '@blue-paper/ui-components';
import { BpaLoginPayload } from '@blue-paper/ui-editor-backend';
import { Subscription } from 'rxjs';
import { LoginViewService } from './login-view.service';

export enum LoginToolbarCommand {
  About = 'about',
}

@Component({
  selector: 'bpa-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss'],
  providers: [
    LoginViewService,
  ]
})
export class LoginViewComponent implements OnInit, OnDestroy {

  private subscriber$: Subscription = null;

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

  message: IMessageText;

  formLogin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private loginState: LoginViewService) { }

  ngOnInit(): void {
    this.subscriber$ = this.loginState.message$
      .subscribe((msg) => this.message = msg);
  }

  ngOnDestroy() {
    if (this.subscriber$) {
      this.subscriber$.unsubscribe();
    }
  }

  toolbarExecute(command: string): void {
    console.log('>> Debug: "%s"', command);
    // TODO the toolbar command
  }

  /**
   * Send the login credentials
   */
  sendLoginCredentials(): void {
    const payload: BpaLoginPayload = this.formLogin.value;
    // this.userFacade.login(payload);
    this.loginState.sendLogin(payload)
      .subscribe(result => console.log('> Debug: Login result "%s"', result));
  }
}
