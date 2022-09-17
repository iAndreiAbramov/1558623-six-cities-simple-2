import { inject, injectable } from 'inversify';
import { ILoggerService } from '../common/logger/logger.types.js';
import { IConfigService } from '../common/app-config/app-config.types.js';
import { Component } from '../types/component.types.js';

@injectable()
export default class Application {
  private logger!: ILoggerService;
  private appConfig!: IConfigService;

  constructor(
    @inject(Component.ILoggerService) providedLogger: ILoggerService,
    @inject(Component.IConfigService) providedAppConfig: IConfigService,
  ) {
    this.logger = providedLogger;
    this.appConfig = providedAppConfig;
  }

  init() {
    this.logger.info('Application initialization...');
    this.logger.info(`The value of PORT is: ${this.appConfig.get('PORT')}`);
  }
}
