import { Routes } from '@angular/router';
import { RoleName } from '@blue-paper/shared-commons';
import { ProtectedPageGuard, RedirectPageGuard } from '@blue-paper/ui-commons';
import { ProtectedRoleGuard } from '@blue-paper/ui-store-editor';
import {
  DashboardViewComponent,
  EditorBureauViewComponent,
  HomeViewComponent,
  LoginViewComponent,
  OverviewViewComponent
} from './views';
import { DetailViewComponent } from './views/editor-bureau/detail/detail-view.component';

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
        canActivate: [
          ProtectedRoleGuard,
        ],
        data: {
          role: RoleName.Editor
        },
        children: [
          {
            path: '',
            component: OverviewViewComponent,
          },
          {
            path: 'detail/:menuId',
            component: DetailViewComponent,
          }
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
]
