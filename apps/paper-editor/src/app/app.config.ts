import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModuleConfig } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/lang-', '.json');
}

export function buildTranslateConfig(): TranslateModuleConfig {

  return {
    loader: {
      provide: TranslateLoader,
      useFactory: (httpTranslateLoader),
      deps: [HttpClient]
    },
    defaultLanguage: 'en',
  }
}
