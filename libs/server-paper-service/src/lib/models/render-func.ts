/**
 * Wrapper interface for the render function of the Response instance from **express** module.
 */
export interface RenderFunc {

  /**
   * @see Response.render
   */
  render(template: string, data?): void;
}
