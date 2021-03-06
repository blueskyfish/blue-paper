import { API_KEY_SECURITY, Auth, AuthUser } from '@blue-paper/server-authentication';
import { EditorMenuItem, MenuService } from '@blue-paper/server-editor-service';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('/editor')
export class MenuController {

  constructor(private menuService: MenuService) {
  }

  @ApiOperation({
    description: 'The menu list of the frontend',
    operationId: 'getEditorMenuList',
    security: API_KEY_SECURITY,
  })
  @ApiOkResponse({
    description: 'The tree nodes',
    type: EditorMenuItem,
    isArray: true,
  })
  @Get('/menu')
  async getEditorMenuList(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Auth('editor') authUser: AuthUser
  ): Promise<EditorMenuItem[]> {

    return await this.menuService.getEditorMenuList();
  }
}
