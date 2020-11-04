import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProtectedPageGuard, RedirectPageGuard } from './guards';
import { AuthenticationService, StorageFacadeService } from './services';

const commonProviders: any[] = [
  // Services
  StorageFacadeService,
  AuthenticationService,

  // Guards
  ProtectedPageGuard,
  RedirectPageGuard,
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  providers: [
    ...commonProviders,
  ],
  exports: [
  ]
})
export class UiCommonsModule {}
