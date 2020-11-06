import { ApiProperty } from '@nestjs/swagger';
import { UserInfo } from './user-info.bean';

export class LoginInfo {
  @ApiProperty({
    description: 'The user information',
    type: UserInfo,
  })
  user: UserInfo;
  @ApiProperty({description: 'The authorization token'})
  token: string;
}
