
/**
 * Callback function for render the html with the given template and data entity.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type TemplateRenderFunc = <T extends object>(template: string, data?: T) => void
