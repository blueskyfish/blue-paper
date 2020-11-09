import { API_KEY_SECURITY, Auth, AuthUser } from '@blue-paper/server-authentication';
import {
  HtmlData,
  HtmlIndexData,
  PaperContext,
  PaperInfo,
  PaperService,
  QueryParams,
  QueryType
} from '@blue-paper/server-paper-service';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PaperParams } from './params';

@ApiTags('Paper')
@Controller()
export class PaperController {

  constructor(private paperService: PaperService) {
  }

  @ApiOperation({
    description: 'Get the html data from given page',
    operationId: 'getHtmlPage',
    security: API_KEY_SECURITY
  })
  @ApiOkResponse({
    description: 'The html data from given page',
    type: HtmlData,
  })
  @ApiParam({
    description: 'The page url',
    name: 'pageUrl',
    type: String,
    required: true,
  })
  @Get('/pages/:pageUrl(*).json')
  async getHtmlPage(@Auth() authUser: AuthUser, @Param() params: PaperParams, @Query() query: QueryType): Promise<HtmlData | HtmlIndexData> {
    const paperContext = new PaperContext(params.pageUrl, QueryParams.toQuery(query), null);
    return await this.paperService.getHtmlPage(paperContext);
  }

  @ApiOperation({
    description: 'Get the paper information',
    operationId: 'getPaperInfo',
    security: API_KEY_SECURITY
  })
  @ApiParam({
    description: 'The page url',
    name: 'pageUrl',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    description: 'The paper info from given page',
    type: PaperInfo,
  })
  @Get('/papers/:pageUrl(*).json')
  async getPaperInfo(@Auth() authUser: AuthUser, @Param() params: PaperParams, @Query() query: QueryType): Promise<PaperInfo> {
    const paperContext = new PaperContext(params.pageUrl, QueryParams.toQuery(query), null);
    return await this.paperService.getPaperInfo(paperContext);
  }
}
