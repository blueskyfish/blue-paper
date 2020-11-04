
export interface ToolButton {

  /**
   * The name of the material icon
   */
  icon: string;

  /**
   * The tooltip key (the translate is in this component)
   */
  tooltip?: string;
}

/**
 * The type of toolbar elements
 *
 * * `string` the divider. Normally the value `-`
 */
export type ToolButtonItem = string | ToolButton;

export const ToolButtonDivider = '-';
