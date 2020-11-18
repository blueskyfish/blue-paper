import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class LoginPayload {

  @ApiProperty({
    description: 'The user email address'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The user password'
  })
  @Length(3, 30)
  password: string;
}
