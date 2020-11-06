import { IsEmail, Length } from 'class-validator';

export class LoginPayload {

  @IsEmail()
  email: string;

  @Length(3, 30)
  password: string;
}
