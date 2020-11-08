import { API_KEY_SECURITY, Auth, AuthUser } from '@blue-paper/server-authentication';
import { LoginInfo, LoginPayload, UserInfo, UserService } from '@blue-paper/server-editor-service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

/**
 * The user endpoints
 */
@ApiTags('User')
@Controller()
export class UserController {

  constructor(private userService: UserService) {
  }

  @ApiOperation({
    description: 'User login',
    operationId: 'sendLogin',
  })
  @ApiOkResponse({
    description: 'Send the login information',
    type: LoginInfo,
  })
  @Post('/login')
  async sendLogin(@Body() payload: LoginPayload): Promise<LoginInfo> {
    return await this.userService.loginUser(payload);
  }

  @ApiOperation({
    description: 'Get user information',
    operationId: 'getUserInfo',
    security: API_KEY_SECURITY,
  })
  @ApiOkResponse({
    description: 'The user information',
    type: UserInfo,
  })
  @Get('/user/info')
  async getUserInfo(@Auth() authUser: AuthUser): Promise<UserInfo> {
    return await this.userService.getUserInfo(authUser);
  }
}
