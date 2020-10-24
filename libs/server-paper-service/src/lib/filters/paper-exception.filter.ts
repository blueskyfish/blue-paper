import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter, ForbiddenException,
  HttpException,
  NotFoundException, UnauthorizedException
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DEFAULT_BRAND } from '../services/html-data.provider';

// region Get Template

const getTemplate = <T extends {content: {title: string }}>(exception: HttpException, data: T) : string => {

  // default title
  data.content.title = 'Error';

  if (exception instanceof BadRequestException) {
    data.content.title = 'Bad Request';
    return 'bad-request';
  }
  if (exception instanceof NotFoundException) {
    data.content.title = 'Not Found';
    return 'not-found';
  }
  if (exception instanceof UnauthorizedException) {
    data.content.title = 'Unauthorized';
    return 'unauthorized';
  }
  if (exception instanceof ForbiddenException) {
    data.content.title = 'Forbidden';
    return 'forbidden';
  }
  // TODO more errors

  // Default template
  return 'error';
}

// endregion

/**
 * Handle the HttpException and set the render template
 *
 * **Handle of Errors**
 *
 * * Bad Request
 * * Not Found
 * * Unauthorized
 * * Forbidden
 *
 * More coming soon.
 */
@Catch(BadRequestException, NotFoundException, ForbiddenException, UnauthorizedException)
export class PaperExceptionFilter implements ExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost): any {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const data = {
      brand: { ...DEFAULT_BRAND },
      title: 'Error',
      navbar: [
        {
          title: 'Home',
          pageUrl: '/index',
          active: true,
        }
      ],
      footer: [],
      content: {
        title: '',
        message: exception.message,
        pageUrl: request.originalUrl,
        stack: exception.stack,
      }
    };

    const template = getTemplate(exception, data);

    response.render(template, data);
  }
}
