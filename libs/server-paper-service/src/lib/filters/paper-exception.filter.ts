import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter, ForbiddenException,
  HttpException,
  NotFoundException, UnauthorizedException
} from '@nestjs/common';
import { Request, Response } from 'express';

// region Get Template

const getTemplate = <T extends {title: string}>(exception: HttpException, data: T) : string => {

  // default title
  data.title = 'Error';

  if (exception instanceof BadRequestException) {
    data.title = 'Bad Request';
    return 'bad-request';
  } else if (exception instanceof NotFoundException) {
    data.title = 'Not Found';
    return 'not-found';
  } else if (exception instanceof UnauthorizedException) {
    data.title = 'Unauthorized';
    return 'unauthorized';
  } else if (exception instanceof ForbiddenException) {
    data.title = 'Forbidden';
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
@Catch(HttpException)
export class PaperExceptionFilter implements ExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost): any {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const data = {
      title: '',
      message: exception.message,
      pageUr: request.originalUrl,
    };

    const template = getTemplate(exception, data);

    response.render(template, data);
  }
}
