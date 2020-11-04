/**
 * Link types
 */
export type LinkType = 'website' | 'internet' | 'email';

/**
 * The link info contains links to other web resources
 */
export interface LinkInfo {

  type: LinkType;
  href: string;
  title: string;
}
