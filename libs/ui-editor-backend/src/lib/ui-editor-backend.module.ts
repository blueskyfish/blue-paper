/* tslint:disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BureauConfiguration, BureauConfigurationParams } from './bureau-configuration';

import { BureauPaperService } from './services/bureau-paper.service';
import { BureauAdminService } from './services/bureau-admin.service';
import { BureauUserService } from './services/bureau-user.service';
import { BureauSystemService } from './services/bureau-system.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    BureauPaperService,
    BureauAdminService,
    BureauUserService,
    BureauSystemService,
    BureauConfiguration
  ],
})
export class UiEditorBackendModule {
  static forRoot(params: BureauConfigurationParams): ModuleWithProviders<UiEditorBackendModule> {
    return {
      ngModule: UiEditorBackendModule,
      providers: [
        {
          provide: BureauConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: UiEditorBackendModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('UiEditorBackendModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
