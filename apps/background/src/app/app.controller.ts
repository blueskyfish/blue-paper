import { SystemService } from '@blue-paper/server-commons';
import { Controller, Get, Query } from '@nestjs/common';


@Controller()
export class AppController {
  constructor(private readonly systemService: SystemService) {}

  @Get('/')
  getHello(@Query('name') name?: string) {
    return this.systemService.getHello(name);
  }
}
