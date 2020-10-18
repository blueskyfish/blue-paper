import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { NotFoundError } from './not-found.error';

/**
 * Catch the exception {@link NotFoundError}.
 */
@Catch(NotFoundError)
export class NotFoundFilter implements ExceptionFilter {

  catch(exception: NotFoundError, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const data = {
      title: 'Page not found',
      message: exception.message,
      url: request.originalUrl,
      ...exception.page
    };

    response
      .status(exception.getStatus())
      .render('not-found', data);
  }
}
