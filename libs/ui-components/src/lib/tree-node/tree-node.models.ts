import { isNil } from '@blue-paper/shared-commons';
import { BpaMenuPlace, BpaTreeKind, BpaTreeMenu } from '@blue-paper/ui-editor-backend';

export enum TreeNodeItemStatus {
  Expanded = 'expanded',
  Collapsed = 'collapsed',
}

export enum TreeNodeMarker {
  Document = 'menu-right',
  Expanded = 'chevron-down',
  Collapsed = 'chevron-right',
}

/**
 * The definition of the icons
 *
 * **NOTE**: The key is the enumeration value from {@link BpaTreeKind}
 */
export const TreeNodeIcon = {
  folder: {
    expanded: 'folder-open-outline',
    collapsed: 'folder-outline',
  },
  page: {
    expanded: 'file-check-outline',
    collapsed: 'file-document-outline',
  },
  blog: {
    expanded: 'book-open-page-variant-outline',
    collapsed: 'book-open-variant',
  }
}

export const TreeNodeSectionIcon = {
  navbar: 'border-top-variant',
  footer: 'border-bottom-variant',
  hidden: 'border-none-variant',
}

/**
 * The event transporter of the menu item selection
 */
export class TreeNodeEvent {
  constructor(
    public readonly id: number,
    public readonly menu: BpaTreeMenu
  ) {
  }
}

export class TreeNodeSectionEvent extends TreeNodeEvent {

  static cloneWith(place: BpaMenuPlace, ev: TreeNodeEvent): TreeNodeSectionEvent {
    return new TreeNodeSectionEvent(place, ev.id, ev.menu);
  }

  constructor(public readonly place: BpaMenuPlace, id: number, data: any) {
    super(id, data);
  }
}

export class TreeNodeItem {

  private _status: TreeNodeItemStatus = TreeNodeItemStatus.Collapsed;
  private _active = false;

  /**
   * @param {number} id the menu id
   * @param {BpaTreeKind} kind the kind of menu item
   * @param {string} path the path segment
   * @param {string} title the title of the menu item
   * @param {BpaTreeMenu} menu the data section for the menu
   * @param {TreeNodeItem[]} children the children menu items
   */
  constructor(
    public readonly id: number,
    public readonly kind: BpaTreeKind,
    public readonly path: string,
    public readonly title: string,
    public readonly menu?: BpaTreeMenu,
    public readonly children?: TreeNodeItem[]
  ) {
  }

  get hasChildren(): boolean {
    return Array.isArray(this.children) && this.children.length > 0;
  }

  get hasData(): boolean {
    return !isNil(this.menu);
  }

  get isFolder(): boolean {
    return this.kind === BpaTreeKind.Folder;
  }

  get isExpanded(): boolean {
    return this.hasChildren && this._status === TreeNodeItemStatus.Expanded;
  }

  get active(): boolean {
    return this._active;
  }

  get tooltip(): string {
    return `${this.title} (${this.menu.keyPath})`;
  }

  updateStatus(status: TreeNodeItemStatus): void {
    if (this._status !== status) {
      this._status = this.hasChildren ? status : TreeNodeItemStatus.Collapsed;
    }
  }

  updateActive(isActive: boolean): void {
    this._active = isActive;
  }

  statusExpanded(): void {
    if (this.hasChildren) {
      this._status = TreeNodeItemStatus.Expanded;
    }
  }

  statusCollapsed(): void {
    this._status = TreeNodeItemStatus.Collapsed;
  }

  get status(): TreeNodeItemStatus {
    return this._status;
  }

  get icon(): string {
    try {
      return TreeNodeIcon[this.kind][this.status] || TreeNodeIcon.page.collapsed;
    } catch (e) {
      return TreeNodeIcon.page.collapsed;
    }
  }

  get marker(): string {
    if (!this.hasChildren) {
      return TreeNodeMarker.Document;
    }
    return this._status === TreeNodeItemStatus.Expanded ? TreeNodeMarker.Expanded : TreeNodeMarker.Collapsed;
  }
}

/**
 * A section in the tree node.
 *
 * Always one section can be activated and expended. All other sections are not active and collapsed.
 */
export class TreeNodeSection {

  private _active = false;

  /**
   * The attribute determines whether the element is displayed or not.
   */
  get active(): boolean {
    return this._active;
  }

  get icon(): string {
    return TreeNodeSectionIcon[this.place] || TreeNodeSectionIcon.hidden;
  }

  /**
   * Has children or not
   */
  get hasChildren(): boolean {
    return Array.isArray(this.children) && this.children.length > 0;
  }

  get title(): string {
    return `app.editorBureau.menu.treeView.${this.place}.section.title`;
  }

  /**
   *
   * @param {number} id The id of the section
   * @param {BpaMenuPlace} place the menu place
   * @param {TreeNodeItem[]} children The list of children tree meun items
   */
  constructor(
    public readonly id: number,
    public readonly place: BpaMenuPlace,
    public readonly children?: TreeNodeItem[]
  ) {
  }

  updateActive(isActive: boolean): void {
    this._active = isActive;
  }
}

/**
 * The id generator
 */
export class IdGenerator {
  constructor(private start) {
  }

  /**
   * Returns the next id
   * @returns {number}
   */
  get next(): number {
    return ++this.start;
  }
}

/**
 * Id generator
 *
 * @param {number} start the start id (default is `0`)
 *
 * @returns {{next: number}} the generator class with the attribute next, that returns the next id.
 */
export function idGenerator(start: number = 0): IdGenerator {
  return new IdGenerator(start);
}
