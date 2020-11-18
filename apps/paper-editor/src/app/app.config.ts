import { HttpClient } from '@angular/common/http';
import { IStoreHttpConfig } from '@blue-paper/ui-store-editor';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModuleConfig } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../environments/environment';

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/lang-', '.json');
}

export function buildTranslateConfig(): TranslateModuleConfig {

  return {
    loader: {
      provide: TranslateLoader,
      useFactory: (httpTranslateLoader),
      deps: [ HttpClient ]
    },
    defaultLanguage: 'en'
  };
}

export function buildHttpConfig(): IStoreHttpConfig {
  return {
    baseApiUrl: environment.baseApiUrl,
    headerName: 'x-blue-paper'
  };
}


export function configStoreDev(): any[] {
  return environment.production ? []
    : [
      StoreDevtoolsModule.instrument({
        name: 'NgRx Paper Editor'
      })
    ];
}
