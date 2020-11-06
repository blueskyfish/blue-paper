import { LoginInfo, LoginPayload, UserService } from '@blue-paper/server-editor-service';
import { Body, Controller, Post } from '@nestjs/common';
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
}
