import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavigateUtil } from '@blue-paper/ui-commons';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { NavigateActions } from './navigate.actions';

@Injectable()
export class NavigateEffectService {

  constructor(private router: Router, private actions$: Actions) {
  }

  navigateToRoute$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(NavigateActions.navigate),
        tap(({paths}) => {
          NavigateUtil.navigate(this.router, ...paths);
        })
      ),
    { dispatch: false }
  )
}
