import { HttpException, HttpStatus } from '@nestjs/common';
import { PageInfo } from './entities';

/**
 * The not found error...
 */
export class NotFoundError extends HttpException {

  constructor(message: string, public readonly page: Partial<PageInfo>) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
