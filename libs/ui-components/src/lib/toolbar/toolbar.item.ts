/**
 * The tool button with the icon, tooltip and command.
 *
 * **NOTE**: Command must be unique.
 */
export interface ToolButton {

  /**
   * The name of the material icon
   */
  icon: string;

  /**
   * The tooltip key (the translate is in this component)
   */
  tooltip?: string;

  command: string;
}

/**
 * The type of toolbar elements
 *
 * * `string` the divider. Normally the value `-`
 */
export type ToolButtonItem = string | ToolButton;

export const ToolButtonDivider = '-';
