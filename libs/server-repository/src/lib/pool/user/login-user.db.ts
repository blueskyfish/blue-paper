
export interface IDbLoginUser {
  userId: number;
  name: string;
  email: string;
  password: string;
  roles: string;
  salt: string;
}
