import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { forwardRef, NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { UiCommonsModule } from '@blue-paper/ui-commons';
import { UiComponentsModule } from '@blue-paper/ui-components';
import { StoreHttpService, UiStoreEditorModule } from '@blue-paper/ui-store-editor';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { buildHttpConfig, buildTranslateConfig, configStoreDev } from './app.config';
import { ROUTES } from './app.routing';
import { HomeViewComponent, LoginViewComponent } from './views';

const components = [
  AppComponent,
  // views
  LoginViewComponent,
  HomeViewComponent,
]

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, {
      useHash: true,
      anchorScrolling: 'enabled',
      paramsInheritanceStrategy: 'always'
    }),
    HttpClientModule,

    TranslateModule.forRoot(buildTranslateConfig()),

    ...configStoreDev(),

    MatIconModule,

    UiCommonsModule,
    UiComponentsModule,
    UiStoreEditorModule.forRoot(buildHttpConfig()),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: forwardRef(() => StoreHttpService),
      multi: true,
    }
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl('assets/mdi.svg'));

  }
}
