import { ApiProperty } from '@nestjs/swagger';

export class UserName {

  @ApiProperty({description: 'The user id'})
  id: number;

  @ApiProperty({description: 'The user name'})
  name: string;
}
