import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { DialogService } from './dialog';
import { ToolbarComponent } from './toolbar';
import { MessagePanelComponent } from './message-panel/message-panel.component';
import { TreeMenuComponent, TreeNodeComponent } from './tree-node';

const components = [
  MessagePanelComponent,
  ToolbarComponent,
  TreeMenuComponent,
  TreeNodeComponent,
];

const providers = [
  DialogService,
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
  ],
  declarations: [
    ...components,
  ],
  providers: [
    ...providers,
  ],
  exports: [
    ...components,
  ]
})
export class UiComponentsModule {}
