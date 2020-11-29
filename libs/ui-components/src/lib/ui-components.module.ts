import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { DialogService, EditRoleComponent } from './dialog';
import { ListBoxComponent } from './list-box';
import { MenuDataService, MenuPanelComponent } from './menu-panel';
import { MessagePanelComponent } from './message-panel/message-panel.component';
import { MenuItemComponent, NodeSectionComponent } from './node-menu';
import { ToolbarComponent } from './toolbar';
import { TitlePanelComponent } from './view';

const components = [
  ListBoxComponent,
  MenuPanelComponent,
  MessagePanelComponent,
  ToolbarComponent,
  MenuItemComponent,
  NodeSectionComponent,
  TitlePanelComponent,
];

const dialogs = [
  EditRoleComponent,
];

const providers = [
  DialogService,
  MenuDataService,
];


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    TranslateModule,

    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatRippleModule,
    MatListModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSliderModule,
    MatTooltipModule,
    MatSelectModule,

    // CDK
    ScrollingModule,
  ],
  declarations: [
    ...components,
    ...dialogs,
  ],
  providers: [
    ...providers,
  ],
  entryComponents: [
    ...dialogs,
  ],
  exports: [
    ...components,
  ]
})
export class UiComponentsModule {}
