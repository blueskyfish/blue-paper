import { Routes } from '@angular/router';
import { ProtectedPageGuard, RedirectPageGuard } from '@blue-paper/ui-commons';
import { HomeViewComponent, LoginViewComponent } from './views';

/**
 * The Routing table
 */
export const ROUTES: Routes = [
  {
    path: 'login',
    component: LoginViewComponent,
    canActivate: [
      RedirectPageGuard,
    ],
  },
  {
    path: 'home',
    component: HomeViewComponent,
    canActivate: [
      ProtectedPageGuard,
    ],
  },
  {
    path: '**',
    redirectTo: 'home'
  }
]
