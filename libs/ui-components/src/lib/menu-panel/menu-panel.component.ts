import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isNil } from '@blue-paper/shared-commons';
import { BpaEnabled, BpaMenuPlace, BpaTemplate } from '@blue-paper/ui-editor-backend';
import { Observable, of, SubscriptionLike } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DialogService, EditRoleComponent } from '../dialog';
import { ListBoxChangeProvider } from '../list-box';
import { DataItemList, MenuDataService } from './menu-data.service';
import { MenuContent } from './menu-panel.models';

/**
 * The event for notify the parent listener, that the form is turn into the **editMode** or not.
 */
export class MenuPanelEditEvent {
  constructor(public readonly status: 'edit' | 'cancel' | 'save', public readonly menu?: MenuContent) {
  }
}

/**
 * Shows menu item information.
 *
 * The part with the menu is editable directly
 */
@Component({
  selector: 'bpa-menu-panel',
  templateUrl: './menu-panel.component.html',
  styleUrls: ['./menu-panel.component.scss']
})
export class MenuPanelComponent implements OnInit, OnDestroy, OnChanges, ListBoxChangeProvider<string> {

  private subscriber$: SubscriptionLike;

  /**
   * The translate key for the title
   */
  get title(): string {
    return this.editMode ? 'app.editorBureau.menuPanel.menuItem.edit' : 'app.editorBureau.menuPanel.menuItem.title';
  }

  /**
   * The example url with the page url
   */
  exampleUrl: string;

  @Input()
  menu: MenuContent;

  /**
   * The example domain for the url
   */
  @Input()
  domain = 'https://www.example.com';


  menuForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    pageUrl: new FormControl('', [Validators.required, Validators.maxLength(512)]),
    place: new FormControl(BpaMenuPlace.Navbar, Validators.required),
    template: new FormControl('', Validators.required),
    ordering: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(1000)]),
    enabled: new FormControl(BpaEnabled.Y),
    roles: new FormControl([]),
  });

  templateList: DataItemList<BpaTemplate>;

  enabledList: DataItemList<BpaEnabled>;

  menuPlaceList: DataItemList<BpaMenuPlace>;

  /**
   * Emit the change of the state
   * @type {EventEmitter<MenuPanelEditEvent>}
   */
  @Output()
  changeState: EventEmitter<MenuPanelEditEvent> = new EventEmitter<MenuPanelEditEvent>();

  get editMode(): boolean {
    return !this.menuForm.disabled;
  }

  set editMode(value: boolean) {
    if (value) {
      this.menuForm.enable({emitEvent: true});
    } else {
      this.menuForm.disable({emitEvent: true});
    }
  }

  constructor(
    private menuDataService: MenuDataService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.editMode = false
    this.templateList = this.menuDataService.templateList;
    this.enabledList = this.menuDataService.enabledList;
    this.menuPlaceList = this.menuDataService.menuPlaceList;

    this.subscriber$ = this.menuForm.get('pageUrl')
      .valueChanges
      .subscribe(pageUrl => this.updatePageUrl(pageUrl));
  }

  ngOnDestroy() {
    if (this.subscriber$) {
      this.subscriber$.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.menu) {
      this.updateMenu(changes.menu.currentValue);
    }
  }

  /**
   * Format the display value for the ordering
   *
   * @param {number} value
   * @returns {string}
   */
  formatOrdering(value: number): string {
    return `${value}`;
  }

  addListBoxValue(): Observable<string> {
    return this.dialogService.open<string>(EditRoleComponent, '', {disableClose: true})
      .dismiss$
      .pipe(
        tap(role => console.log('> Debug: Add role =>', role))
      );
  }

  deleteListBoxValue(value: string): Observable<boolean> {
    return of(true);
  }

  editListBoxValue(value: string): Observable<string> {
    return this.dialogService.open<string>(EditRoleComponent, value, {disableClose: true})
      .dismiss$
      .pipe(
        tap(role => console.log('> Debug: Add role =>', role))
      );
  }

  /**
   * Start into the **editMode** and enabled the form.
   */
  edit(): void {
    this.editMode = true;
    this.changeState.emit(new MenuPanelEditEvent('edit', this.menu));
  }

  /**
   * Save the menu item. It emit an event to the parent listener with the action **save**
   */
  save() {
    const menuData = this.menuForm.value;
    this.editMode = false;
    this.changeState.emit(new MenuPanelEditEvent('save', menuData));
  }

  /**
   * Cancel the current edit mode and replace the form values with the old values.
   */
  cancel(): void {
    this.updateMenu(this.menu);
    this.editMode = false;
    this.changeState.emit(new MenuPanelEditEvent('cancel', this.menu));
  }

  private updateMenu(menu: MenuContent): void {
    if (!isNil(menu)) {
      this.menuForm.setValue(menu);
      this.updatePageUrl(menu.pageUrl);
    }
  }

  private updatePageUrl(pageUrl: string): void {
    this.exampleUrl = `${this.domain}${pageUrl}.html`;
  }
}
