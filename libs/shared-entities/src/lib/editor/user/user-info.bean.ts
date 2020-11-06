import { UserName } from './user-name.bean';

export interface UserInfo extends UserName {
  email: string;
  roles: string[];
}
