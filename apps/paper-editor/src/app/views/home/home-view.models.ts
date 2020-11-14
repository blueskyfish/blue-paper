import { RoleName } from '@blue-paper/shared-commons';
import { ToolButtonDivider, ToolButtonItem } from '@blue-paper/ui-components';

/**
 * Commands for the home toolbar
 */
export enum HomeToolbarCommand {
  UserAccount = 'userAccount',
  Dashboard = 'dashboard',
  EditorBureau = 'editor.bureau',
  AccountManager = 'account.manager',
  Logout = 'logout',
  About = 'about'
}

/**
 * Interface for the role and tool button.
 */
export interface ToolButtonDef {
  /**
   * The role name or null. If the value is null, it adds every time to the tool button list
   */
  role: string | null,

  /**
   * The tool button item (`-` for divider or {@link ToolButton})
   */
  button: ToolButtonItem;
}

export const USER_ACCOUNT_TOOL_BUTTON: ToolButtonDef = {
  role: null,
  button: {
    command: HomeToolbarCommand.UserAccount,
    icon: 'account-circle-outline',
    tooltip: 'app.toolbar.account.tooltip'
  }
};

export const DASHBOARD_TOOL_BUTTON: ToolButtonDef = {
  role: null,
  button: {
    command: HomeToolbarCommand.Dashboard,
    icon: 'billboard',
    tooltip: 'app.toolbar.dashboard.tooltip'
  }
}

export const EDITOR_TOOL_BUTTON: ToolButtonDef = {
  role: RoleName.Editor,
  button: {
    command: HomeToolbarCommand.EditorBureau,
    tooltip: 'app.toolbar.editorBureau.tooltip',
    icon: 'bulletin-board'
  }
};

export const ACCOUNT_MANAGER_TOOL_BUTTON: ToolButtonDef = {
  role: RoleName.Admin,
  button: {
    command: HomeToolbarCommand.AccountManager,
    tooltip: 'app.toolbar.accountManager.tooltip',
    icon: 'account-group-outline'
  }
};

export const ABOUT_TOOL_BUTTON: ToolButtonDef = {
  role: null,
  button: {
    command: HomeToolbarCommand.About,
    icon: 'information-outline',
    tooltip: 'app.toolbar.about.tooltip'
  }
}

export const LOGOUT_TOOL_BUTTON: ToolButtonDef = {
  role: null,
  button: {
    command: HomeToolbarCommand.Logout,
    icon: 'logout',
    tooltip: 'app.toolbar.logout.tooltip'
  }
}

const DIVIDER_TOOL: ToolButtonDef = {
  role: null,
  button: ToolButtonDivider,
};

/**
 * The list of buttons for the sidebar toolbar
 *
 * @type {ToolButtonDef[]}
 */
export const TOOL_BUTTON_LIST = [
  USER_ACCOUNT_TOOL_BUTTON,
  DASHBOARD_TOOL_BUTTON,
  EDITOR_TOOL_BUTTON,
  ACCOUNT_MANAGER_TOOL_BUTTON,
  DIVIDER_TOOL,
  ABOUT_TOOL_BUTTON,
  LOGOUT_TOOL_BUTTON,
];
