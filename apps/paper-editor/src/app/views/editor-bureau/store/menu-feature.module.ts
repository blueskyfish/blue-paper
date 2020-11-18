import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MenuEffectService } from './menu/menu.effects';
import * as fromMenu from './menu/menu.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(fromMenu.MenuFeatureKey, fromMenu.reducer),
    EffectsModule.forFeature([MenuEffectService])
  ],
  providers: [
    MenuEffectService,
  ]
})
export class MenuFeatureModule {

}
