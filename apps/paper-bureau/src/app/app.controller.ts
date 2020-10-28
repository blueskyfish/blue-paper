import { SystemService } from '@blue-paper/server-commons';
import { Controller, Get, Query } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private systemService: SystemService) {}

  @Get('/')
  getHello(@Query('name') name?: string): { message: string } {
    return this.systemService.getHello(name);
  }
}
