import { inject, injectable } from 'inversify';
import { ILoggerService } from '../common/logger/logger.types.js';
import { IConfigService } from '../common/app-config/app-config.types.js';
import { Component } from '../types/component.types.js';
import { IDbClient } from '../common/db-client/db-client.types';
import { getDbConnectionURI } from '../utils/db.utils.js';
import express, { Express } from 'express';
import { IController } from '../types/controller.types';
import { IExceptionFilter } from '../common/errors/exception-filter.types';

@injectable()
export default class Application {
  private app: Express;

  constructor(
    @inject(Component.ILoggerService) private logger: ILoggerService,
    @inject(Component.IConfigService) private appConfig: IConfigService,
    @inject(Component.IDbClient) private dbClient: IDbClient,
    @inject(Component.OfferController) private offerController: IController,
    @inject(Component.IExceptionFilter)
    private exceptionFilter: IExceptionFilter,
  ) {
    this.app = express();
  }

  private initMiddlewares() {
    this.app.use(express.json());
  }

  private initRoutes() {
    this.app.use('/offers', this.offerController.router);
  }

  private initExceptionFilters() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
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

    this.initMiddlewares();
    this.initRoutes();
    this.initExceptionFilters();

    const port = this.appConfig.get('PORT');
    this.app.listen(port);
    this.logger.info(`Server started on port: ${port}`);
  }
}
