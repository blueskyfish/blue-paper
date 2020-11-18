import { ApiProperty } from '@nestjs/swagger';
import { UserName } from './user-name.bean';

export class UserInfo extends UserName {

  @ApiProperty({description: 'The user email'})
  email: string;

  @ApiProperty({description: 'The user roles'})
  roles: string[];
}
