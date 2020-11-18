import { Injectable } from '@angular/core';
import { AuthStorageService, PathName } from '@blue-paper/ui-commons';
import { BpaUserInfo, BureauUserService } from '@blue-paper/ui-editor-backend';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, delay, map, mergeMap, switchMap } from 'rxjs/operators';
import { processCatch } from '../message/message.utils';
import { NavigateActions } from '../navigate';
import { UserActions } from './user.actions';
import { UserCategory } from './user.categories';

@Injectable()
export class UserEffectService {

  constructor(
    private actions$: Actions,
    private userService: BureauUserService,
    private authService: AuthStorageService
  ) {}

  readonly sendLoginAndGetUserInfo$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(UserActions.sendLogin),
        switchMap(({payload}) => {
          return this.userService.sendLogin({ body: payload})
            .pipe(
              mergeMap(({ token, user}) => {
                this.authService.updateToken(token);
                return of(
                  UserActions.userInfo(user),
                  NavigateActions.navigate({ paths: [PathName.Root, PathName.Home]})
                );
              }),
              catchError(processCatch(UserCategory.Login, 'app.error.login.message'))
            );
        })
      )
  );

  readonly initialAndGetUserInfo$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(ROOT_EFFECTS_INIT),
        delay(300),
        switchMap(() => {
          if (this.authService.hasToken()) {
            return this.userService.getUserInfo()
              .pipe(
                mergeMap((user: BpaUserInfo) => {
                  return of(
                    UserActions.userInfo(user),
                  )
                }),
                catchError(processCatch(UserCategory.UserInfo, 'app.error.userInfo.message'))
              );
          }

          return EMPTY;
        }),
      )
  );

  readonly logoutUser$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(UserActions.logoutUser),
        map(() => {
          this.authService.removeToken();
          return NavigateActions.navigate({paths: [PathName.Root, PathName.Login]});
        })
      )
  )
}
