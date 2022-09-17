import { ILogger } from '../common/logger/logger.types';
import { IAppConfig } from '../common/app-config/app-config.types';

export default class Application {
  private logger!: ILogger;
  private appConfig!: IAppConfig;

  constructor(providedLogger: ILogger, providedAppConfig: IAppConfig) {
    this.logger = providedLogger;
    this.appConfig = providedAppConfig;
  }

  init() {
    this.logger.info('Application initialization...');
    this.logger.info(`The value of PORT is: ${this.appConfig.get('PORT')}`);
  }
}
