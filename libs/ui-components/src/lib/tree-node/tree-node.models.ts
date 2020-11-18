import { isNil } from '@blue-paper/shared-commons';

export enum TreeMenuItemStatus {
  Expanded = 'expanded',
  Collapsed = 'collapsed',
}

export enum TreeMenuItemKind {
  Path = 'path',
  Page = 'page',
  Blog = 'blog',
}

export enum TreeNodeMarker {
  NoChildren = 'circle-medium',
  Expanded = 'chevron-down',
  Collapsed = 'chevron-right',
}

/**
 * The definition of the icons
 *
 */
export const TreeMenuIcon = {
  path: {
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

/**
 * The event transporter of the menu item selection
 */
export class TreeMenuEvent {
  constructor(
    public readonly id: number,
    public readonly data: any
  ) {
  }
}

export class TreeMenuItem {

  private _status: TreeMenuItemStatus = TreeMenuItemStatus.Collapsed;
  private _active = false;

  /**
   * @param {number} id the menu id
   * @param {TreeMenuItemKind} kind the kind of menu item
   * @param {string} title the title of the menu item
   * @param data the data section for the menu
   * @param {TreeMenuItem[]} children the children menu items
   */
  constructor(
    public readonly id: number,
    public readonly kind: TreeMenuItemKind,
    public readonly title: string,
    public readonly data?: any,
    public readonly children?: TreeMenuItem[]
  ) {
  }

  get hasChildren(): boolean {
    return Array.isArray(this.children) && this.children.length > 0;
  }

  get hasData(): boolean {
    return !isNil(this.data);
  }

  get isExpanded(): boolean {
    return this.hasChildren && this._status === TreeMenuItemStatus.Expanded;
  }

  get active(): boolean {
    return this._active;
  }

  updateStatus(status: TreeMenuItemStatus): void {
    if (this._status !== status) {
      this._status = this.hasChildren ? status : TreeMenuItemStatus.Collapsed;
    }
  }

  updateActive(isActive: boolean): void {
    this._active = isActive;
  }

  statusExpanded(): void {
    if (this.hasChildren) {
      this._status = TreeMenuItemStatus.Expanded;
    }
  }

  statusCollapsed(): void {
    this._status = TreeMenuItemStatus.Collapsed;
  }

  get status(): TreeMenuItemStatus {
    return this._status;
  }

  get icon(): string {
    try {
      return TreeMenuIcon[this.kind][this.status] || TreeMenuIcon.page.collapsed;
    } catch (e) {
      return TreeMenuIcon.page.collapsed;
    }
  }

  get marker(): string {
    if (!this.hasChildren) {
      return TreeNodeMarker.NoChildren;
    }
    return this._status === TreeMenuItemStatus.Expanded ? TreeNodeMarker.Expanded : TreeNodeMarker.Collapsed;
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

  /**
   * Has children or not
   */
  get hasChildren(): boolean {
    return Array.isArray(this.children) && this.children.length > 0;
  }

  /**
   *
   * @param {number} id The id of the section
   * @param {string} icon The icon of the section
   * @param {string} title The title of the section
   * @param {TreeMenuItem[]} children The list of children tree meun items
   */
  constructor(
    public readonly id: number,
    public readonly icon: string,
    public readonly title: string,
    public readonly children?: TreeMenuItem[]
  ) {
  }

  updateActive(isActive: boolean): void {
    this._active = isActive;
  }
}


/**
 * Id generator
 *
 * @param {number} start the start id (default is `0`)
 *
 * @returns {{next: number}} the generator class with the attribute next, that returns the next id.
 */
export function idGenerator(start: number = 0) {

  /**
   * The ID generator
   */
  return {

    /**
     * Returns the next id
     * @returns {number}
     */
    get next(): number {
      return ++start;
    }
  };
}
