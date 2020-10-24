import { Enabled, MenuPlace } from '../../../models';

/**
 * Entity of menu repository
 */
export interface IDbMenu {
  id: number;
  pageUrl: string;
  title: string;
  template: string;
  ordering: number;
  groupId: number;
  place: MenuPlace;
  roles: string;
  enabled: Enabled
}
