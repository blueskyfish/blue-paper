
export enum PathName {

  Root = '/',

  Home = 'home',

  /**
   * The login view
   */
  Login = 'login',

  /**
   * The path to the editor bureau main view
   */
  Editor = 'editor',

  /**
   * The path segment for detail view
   */
  Detail = 'detail',
}

/**
 * A path segment is a string or number
 */
export type PathSegment = PathName | number;

/**
 * A list of path segments
 */
export type PathSegments = PathSegment[];
