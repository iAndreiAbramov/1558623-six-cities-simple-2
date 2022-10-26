import { inject, injectable } from 'inversify';
import { ILoggerService } from '../common/logger/logger.types.js';
import { IConfigService } from '../common/config-service/config-service.types';
import { Component } from '../types/component.types.js';
import { IDbClient } from '../common/db-client/db-client.types';
import { getDbConnectionURI } from '../utils/db.utils.js';
import express, { Express } from 'express';
import { IController } from '../types/controller.types';
import { IExceptionFilter } from '../common/errors/exception-filter.types';
import { AuthenticateMiddleware } from '../common/middlewares/authenticate.middleware.js';
import cors from 'cors';

@injectable()
export default class Application {
  private app: Express;

  constructor(
    @inject(Component.ILoggerService) private logger: ILoggerService,
    @inject(Component.IConfigService) private configService: IConfigService,
    @inject(Component.IDbClient) private dbClient: IDbClient,
    @inject(Component.OfferController) private offerController: IController,
    @inject(Component.UserController) private userController: IController,
    @inject(Component.CommentController) private commentController: IController,
    @inject(Component.IExceptionFilter)
    private exceptionFilter: IExceptionFilter,
  ) {
    this.app = express();
  }

  private initMiddlewares() {
    this.app.use(express.json());
    this.app.use(
      '/upload',
      express.static(this.configService.get('UPLOAD_DIRECTORY')),
    );
    const authenticateMiddleware = new AuthenticateMiddleware(
      this.configService.get('JWT_SECRET'),
    );
    this.app.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
    this.app.use(cors());
  }

  private initRoutes() {
    this.app.use('/offers', this.offerController.router);
    this.app.use('/user', this.userController.router);
    this.app.use('/comment', this.commentController.router);
  }

  private initExceptionFilters() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  async init(): Promise<void> {
    this.logger.info('Application initialization...');
    await this.dbClient.connect(
      getDbConnectionURI({
        dbUser: this.configService.get('DB_USER'),
        dbPassword: this.configService.get('DB_PASSWORD'),
        dbHost: this.configService.get('DB_HOST'),
        dbPort: this.configService.get('DB_PORT'),
        dbName: this.configService.get('DB_NAME'),
      }),
    );

    this.initMiddlewares();
    this.initRoutes();
    this.initExceptionFilters();

    const port = this.configService.get('PORT');
    this.app.listen(port);
    this.logger.info(`Server started on port: ${port}`);
  }
}
