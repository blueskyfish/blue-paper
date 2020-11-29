import { BpaEnabled, BpaMenuPlace, BpaTemplate, BpaUserName } from '@blue-paper/ui-editor-backend';

export interface TextContent {
  title: string;
  author: BpaUserName;
  creation: Date;
  modified: Date;
}

export interface MenuContent {
  title: string;
  place: BpaMenuPlace;
  pageUrl: string;
  template: BpaTemplate;
  roles: string[];
  ordering: number;
  enabled: BpaEnabled;
}
