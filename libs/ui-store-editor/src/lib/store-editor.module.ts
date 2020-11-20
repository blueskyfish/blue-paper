import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProtectedRoleGuard } from './guards';
import { NavigateEffectService } from './navigate';
import { IStoreHttpConfig, StoreHttpConfig } from './store-http-config';
import { StoreHttpService } from './store-http.service';
import { UserEffectService, UserFacadeService } from './user';

// States and Reducers
import * as fromRoot from './app.reducer';
/*
import * as fromLoader from './loader/loader.reducer';
import * as fromMessage from './message/message.reducer';
import * as fromUser from './user/user.reducer';
 */

const storeEffects = [
  UserEffectService,
  NavigateEffectService,
];

@NgModule({
  imports: [
    CommonModule,

    StoreModule.forRoot(
      fromRoot.reducer,
      {
        initialState: fromRoot.initialState,
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    /*
    StoreModule.forFeature(fromLoader.LOADER_FEATURE_KEY, fromLoader.reducer),
    StoreModule.forFeature(fromMessage.MESSAGE_FEATURE_KEY, fromMessage.reducer),
    StoreModule.forFeature(fromUser.USER_FEATURE_KEY, fromUser.reducerUser),
     */

    EffectsModule.forRoot(storeEffects),
  ],
  providers: [
    UserFacadeService,
    StoreHttpService,
    ProtectedRoleGuard,
  ],
})
export class UiStoreEditorModule {

  static forRoot(config: IStoreHttpConfig): ModuleWithProviders<UiStoreEditorModule> {
    return {
      ngModule: UiStoreEditorModule,
      providers: [
        {
          provide: StoreHttpConfig,
          useFactory: () => new StoreHttpConfig(config),
        }
      ]
    };
  }
}
