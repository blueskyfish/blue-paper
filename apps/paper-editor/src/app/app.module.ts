import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { forwardRef, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { UiCommonsModule } from '@blue-paper/ui-commons';
import { UiComponentsModule } from '@blue-paper/ui-components';
import { StoreHttpService, UiStoreEditorModule } from '@blue-paper/ui-store-editor';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { buildHttpConfig, buildTranslateConfig, configStoreDev } from './app.config';
import { ROUTES } from './app.routing';
import { LogoutConfirmComponent } from './dialogs';
import { LogoutDialogService } from './dialogs/logout-dialog.service';
import {
  DashboardViewComponent,
  DetailViewComponent,
  EditorBureauViewComponent,
  HomeViewComponent,
  LoginViewComponent,
  OverviewViewComponent
} from './views';
import { MenuFeatureModule } from './views/editor-bureau/store/menu-feature.module';

const components = [
  AppComponent,
  // views
  DashboardViewComponent,
  EditorBureauViewComponent,
  OverviewViewComponent,
  DetailViewComponent,
  LoginViewComponent,
  HomeViewComponent,
];

const dialogs = [
  LogoutConfirmComponent,
];

@NgModule({
  declarations: [
    ...components,
    ...dialogs,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, {
      useHash: true,
      anchorScrolling: 'enabled',
      paramsInheritanceStrategy: 'always'
    }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule.forRoot(buildTranslateConfig()),

    ...configStoreDev(),

    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,

    UiCommonsModule,
    UiComponentsModule,
    UiStoreEditorModule.forRoot(buildHttpConfig()),

    MenuFeatureModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: forwardRef(() => StoreHttpService),
      multi: true,
    },
    LogoutDialogService,
  ],
  entryComponents: [
    ...dialogs,
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
