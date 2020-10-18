
/**
 * The page information from the database
 */
export interface PageInfo {

  /**
   * The title of the page.
   */
  title: string;

  /**
   * Brand in the header
   */
  brand: {

    /**
     * The url to the brand logo
     */
    url: string;

    /**
     * The title of the brand
     */
    title: string;
  }
}

/**
 * The default page information
 * @type {PageInfo}
 * @see {@link PageInfo}
 */
export const DEFAULT_PAGE: PageInfo = {
  title: 'Blue Paper',
  brand: {
    url: 'assets/logo-black.svg',
    title: 'Blue Paper'
  }
};
