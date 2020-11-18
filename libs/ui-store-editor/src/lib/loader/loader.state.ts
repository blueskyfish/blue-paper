
export enum DisplayLoader {
  Show = 'show',
  Hide = 'hide'
}

export interface LoaderState {

  /**
   * The status of loading
   */
  display: DisplayLoader;
}
