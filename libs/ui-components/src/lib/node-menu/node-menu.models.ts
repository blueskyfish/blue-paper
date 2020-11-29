import { BpaEditorMenuItem, BpaMenuPlace, BpaTemplate } from '@blue-paper/ui-editor-backend';

export enum NodeItemStatus {
  Expanded = 'expanded',
  Collapsed = 'collapsed',
}

/**
 * The definition of the icons
 *
 * **NOTE**: The key is the enumeration value from {@link BpaTemplate}
 */
export const NodeMenuIcon = {
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
export class NodeMenuEvent {
  constructor(public readonly menu: BpaEditorMenuItem) {}
}

export class NodeMenuItem {

  private _status: NodeItemStatus = NodeItemStatus.Collapsed;

  private _active = false;

  /**
   * @param {BpaEditorMenuItem} menu the data section for the menu
   */
  constructor(public readonly menu: BpaEditorMenuItem) {
  }

  get template(): BpaTemplate {
    return this.menu.template;
  }

  get title(): string {
    return this.menu.title;
  }

  get isExpanded(): boolean {
    return this._status === NodeItemStatus.Expanded;
  }

  get active(): boolean {
    return this._active;
  }

  get tooltip(): string {
    return `${this.menu.place}:/${this.menu.pageUrl}.html`;
  }

  updateStatus(status: NodeItemStatus): void {
    if (this._status !== status) {
      this._status = status;
    }
  }

  updateActive(isActive: boolean): void {
    this._active = isActive;
    if (isActive) {
      this.statusExpanded();
    } else {
      this.statusCollapsed();
    }
  }

  statusExpanded(): void {
    this._status = NodeItemStatus.Expanded;
  }

  statusCollapsed(): void {
    this._status = NodeItemStatus.Collapsed;
  }

  get status(): NodeItemStatus {
    return this._status;
  }

  get icon(): string {
    try {
      return NodeMenuIcon[this.template][this.status] || NodeMenuIcon.page.collapsed;
    } catch (e) {
      return NodeMenuIcon.page.collapsed;
    }
  }
}

/**
 * A section in the node menu.
 *
 * Always one section can be activated and expended. All other sections are not active and collapsed.
 */
export class NodeMenuSection {

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
   * @param {BpaMenuPlace} place the menu place
   * @param {NodeMenuItem[]} children The list of children tree meun items
   */
  constructor(
    public readonly place: BpaMenuPlace,
    public readonly children: NodeMenuItem[]
  ) {
  }

  updateActive(isActive: boolean): void {
    this._active = isActive;
  }
}
