import { API_KEY_SECURITY, Auth, AuthUser } from '@blue-paper/server-authentication';
import { MenuService, TreeRootMenu } from '@blue-paper/server-editor-service';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('/editor')
export class MenuController {

  constructor(private menuService: MenuService) {
  }

  @ApiOperation({
    description: 'The menu list as tree nodes',
    operationId: 'getEditorTreeMenuList',
    security: API_KEY_SECURITY,
  })
  @ApiOkResponse({
    description: 'The tree nodes',
    type: TreeRootMenu,
    isArray: true,
  })
  @Get('/menu')
  async getEditorTreeMenuList(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Auth('editor') authUser: AuthUser
  ): Promise<TreeRootMenu[]> {

    return await this.menuService.getEditorTreeMenuList();
  }
}
