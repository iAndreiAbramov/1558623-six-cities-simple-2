import { ILoggerService } from './logger.types';
import pino, { Logger } from 'pino';
import { injectable } from 'inversify';

@injectable()
export default class LoggerService implements ILoggerService {
  private logger!: Logger;

  constructor() {
    this.logger = pino();
    this.logger.info('Logger created');
  }

  info(message: string, ...args: unknown[]) {
    this.logger.info(message, ...args);
  }

  warn(message: string, ...args: unknown[]) {
    this.logger.warn(message, ...args);
  }

  error(message: string, ...args: unknown[]) {
    this.logger.error(message, ...args);
  }

  debug(message: string, ...args: unknown[]) {
    this.logger.debug(message, ...args);
  }
}
