import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProtectedPageGuard, RedirectPageGuard } from './guards';
import { AuthStorageService, StorageFacadeService } from './services';

const commonProviders: any[] = [
  // Services
  StorageFacadeService,
  AuthStorageService,

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
export class UiCommonsModule {
}
