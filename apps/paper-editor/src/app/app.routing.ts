import { Routes } from '@angular/router';
import { ProtectedPageGuard, RedirectPageGuard } from '@blue-paper/ui-commons';
import { DashboardViewComponent, EditorBureauViewComponent, HomeViewComponent, LoginViewComponent } from './views';

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
    children: [
      {
        path: '',
        component: DashboardViewComponent,
      },
      {
        path: 'editor',
        component: EditorBureauViewComponent,
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
]
