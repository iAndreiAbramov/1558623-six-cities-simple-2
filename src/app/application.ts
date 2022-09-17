import { ILogger } from '../common/logger/logger.types';

export default class Application {
  private logger!: ILogger;

  constructor(providedLogger: ILogger) {
    this.logger = providedLogger;
  }

  init() {
    this.logger.info('Application initialization...');
  }
}
