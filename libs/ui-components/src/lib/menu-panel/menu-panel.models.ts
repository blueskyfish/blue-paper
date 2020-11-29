import { BpaEnabled, BpaMenuPlace, BpaTemplate, BpaUserName } from '@blue-paper/ui-editor-backend';

export interface MenuContent {
  menuId: number;
  title: string;
  place: BpaMenuPlace;
  pageUrl: string;
  template: BpaTemplate;
  roles: string[];
  ordering: number;
  enabled: BpaEnabled;
}
