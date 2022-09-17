import { ILogger } from './logger.types';
import pino, { Logger } from 'pino';

export default class LoggerService implements ILogger {
  private logger!: Logger;

  constructor() {
    this.logger = pino();
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
