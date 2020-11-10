import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isNil } from '@blue-paper/shared-commons';
import { IMessageText, ToolButtonItem } from '@blue-paper/ui-components';
import { BpaLoginPayload } from '@blue-paper/ui-editor-backend';
import { UserFacadeService } from '@blue-paper/ui-store-editor';
import { Subscription } from 'rxjs';
import { IMessage } from '../../../../../../libs/ui-store-editor/src/lib/message';

export enum LoginToolbarCommand {
  About = 'about',
}

const DEFAULT_MESSAGE: IMessageText = {
  kind: 'info',
  text: 'app.login.message.text',
}

@Component({
  selector: 'bpa-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
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

  message: IMessageText = { ...DEFAULT_MESSAGE};

  formLogin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private userFacade: UserFacadeService) { }

  ngOnInit(): void {
    this.userFacade.loginInit();
    this.subscriber$ = this.userFacade.getLoginError$
      .subscribe((msg: IMessage) => {
        this.message = isNil(msg) ?
          {...DEFAULT_MESSAGE} :
          {
            kind: 'error',
            title: msg.title,
            text: msg.message,
            closeable: true,
          }
      });
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
   * The close button is visible in the message panel. Remove or close the error messages.
   */
  closeMessage(): void {
    this.userFacade.closeLoginError();
  }

  /**
   * Send the login credentials
   */
  sendLoginCredentials(): void {
    const payload: BpaLoginPayload = this.formLogin.value;
    this.userFacade.login(payload);
  }
}
