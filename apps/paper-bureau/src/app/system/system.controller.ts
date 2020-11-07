import { Hello, SystemService } from '@blue-paper/server-commons';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HelloParams } from './hello.params';

@ApiTags('System')
@Controller()
export class SystemController {
  constructor(private systemService: SystemService) {}

  @ApiOperation({
    description: 'Check the backend',
    operationId: 'getHello'
  })
  @ApiOkResponse({
    description: 'The Hello message',
    type: Hello,
  })
  @Get('/')
  getHello(
    @Query() params: HelloParams): Hello {
    return this.systemService.getHello(params.name);
  }
}
