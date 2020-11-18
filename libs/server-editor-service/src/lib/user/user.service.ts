import { AuthService, AuthUser, IAuthUser } from '@blue-paper/server-authentication';
import { LogService } from '@blue-paper/server-commons';
import { IRepositoryPool, RepositoryService } from '@blue-paper/server-repository';
import { isNil } from '@blue-paper/shared-commons';
import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginInfo, LoginPayload, UserInfo } from '../entities';
import { USER_GROUP } from './user.const';

@Injectable()
export class UserService {

  constructor(
    private log: LogService,
    private repository: RepositoryService,
    private authService: AuthService
  ) {
  }

  async loginUser({email, password}: LoginPayload): Promise<LoginInfo> {

    return this.repository.execute<LoginInfo>(async (rep: IRepositoryPool) => {

      const dbUser = await rep.user.findUserByEmail(email);
      if (isNil(dbUser)) {
        this.log.debug(USER_GROUP, `User not found (1)`);
        throw new NotFoundException('User not found');
      }

      if (!this.authService.checkPassword(dbUser.salt, password, dbUser.password)) {
        this.log.debug(USER_GROUP, `Password not fit`);
        throw new NotFoundException('User not found');
      }

      const roles: string[] = JSON.parse(dbUser.roles);

      const authUser: IAuthUser = {
        id: dbUser.userId,
        roles,
      };
      const token = this.authService.generateToken(authUser);

      // Build the result
      return {
        user: {
          id: dbUser.userId,
          name: dbUser.name,
          email: dbUser.email,
          roles,
        },
        token,
      } as LoginInfo;
    })
  }

  async getUserInfo(user: AuthUser): Promise<UserInfo> {
    return await this.repository.execute<UserInfo>(async (rep: IRepositoryPool) => {
      const db = await rep.user.findUserById(user.id);
      if (isNil(db)) {
        throw new NotFoundException(`${USER_GROUP}: User not found`);
      }
      return {
        id: db.userId,
        name: db.name,
        email: db.email,
        roles: JSON.parse(db.roles),
      };
    });
  }
}
