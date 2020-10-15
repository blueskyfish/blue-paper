import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LogService {
  constructor(private logger: Logger) {}

  trace(context: string, message: string): void {
    this.logger.verbose(message, context);
  }

  debug(context: string, message: string): void {
    this.logger.debug(message, context);
  }

  info(context: string, message: string): void {
    this.logger.log(message, context);
  }

  warn(context: string, message: string): void {
    this.logger.warn(message, context);
  }

  error(context: string, message: string): void {
    this.logger.error(message, context);
  }
}
