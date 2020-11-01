
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * The toc information
 */
export interface TocInfo {
  readonly level: HeadingLevel;
  readonly id: string;
  readonly title: string;
}
