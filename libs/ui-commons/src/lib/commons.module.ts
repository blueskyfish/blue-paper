import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProtectedPageGuard, RedirectPageGuard } from './guards';
import { SafeHtmlPipe } from './pipes';
import { AuthStorageService, StorageFacadeService } from './services';

const commonProviders: any[] = [
  // Services
  StorageFacadeService,
  AuthStorageService,

  // Guards
  ProtectedPageGuard,
  RedirectPageGuard,
];

const commonPipes = [
  SafeHtmlPipe,
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
    SafeHtmlPipe
  ],
  declarations: [
    ...commonPipes,
  ]
})
export class UiCommonsModule {
}
