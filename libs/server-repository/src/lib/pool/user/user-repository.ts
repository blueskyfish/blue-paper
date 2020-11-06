import { SubRepository } from '../sub-repository';
import { IDbUserInfo } from './user-info.db';
import { userSql } from './user-repository.sql';
import { IDbLoginUser } from './login-user.db';

export class UserRepository extends SubRepository {

  async findUserByEmail(email: string): Promise<IDbLoginUser> {
    return await this.conn.selectOne<IDbLoginUser>(userSql.findUserByEmail, {email});
  }

  async findUserById(userId: number): Promise<IDbUserInfo> {
    return await this.conn.selectOne<IDbUserInfo>(userSql.findUserById, {userId});
  }
}
