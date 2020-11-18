
export const AUTHENTICATION_GROUP = 'Authentication';

/**
 * The http header name for the authorization token
 */
export const HTTP_AUTH_HEADER = 'x-blue-paper';

/**
 * The api key name
 */
export const API_KEY_NAME = 'ApiBluePaper';

/**
 * The security key
 */
export const API_KEY_SECURITY: Record<string, string[]>[] = [{
  [API_KEY_NAME]: []
}];

