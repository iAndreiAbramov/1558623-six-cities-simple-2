import { inject, injectable } from 'inversify';
import { ILoggerService } from '../common/logger/logger.types.js';
import { IConfigService } from '../common/app-config/app-config.types.js';
import { Component } from '../types/component.types.js';
import { IDbClient } from '../common/db-client/db-client.types';
import { getDbConnectionURI } from '../utils/db.utils';

@injectable()
export default class Application {
  private logger!: ILoggerService;
  private appConfig!: IConfigService;
  private dbClient!: IDbClient;

  constructor(
    @inject(Component.ILoggerService) providedLogger: ILoggerService,
    @inject(Component.IConfigService) providedAppConfig: IConfigService,
    @inject(Component.IDbClient) providedDbClient: IDbClient,
  ) {
    this.logger = providedLogger;
    this.appConfig = providedAppConfig;
    this.dbClient = providedDbClient;
  }

  async init(): Promise<void> {
    this.logger.info('Application initialization...');
    await this.dbClient.connect(
      getDbConnectionURI({
        dbUser: this.appConfig.get('DB_USER'),
        dbPassword: this.appConfig.get('DB_PASSWORD'),
        dbHost: this.appConfig.get('DB_HOST'),
        dbPort: this.appConfig.get('DB_PORT'),
        dbName: this.appConfig.get('DB_NAME'),
      }),
    );
  }
}
