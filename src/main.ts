import 'reflect-metadata';
import { Container } from 'inversify';
import Application from './app/application.js';
import { Component } from './types/component.types.js';
import LoggerService from './common/logger/logger.service.js';
import { ConfigService } from './common/app-config/config.service.js';
import { IConfigService } from './common/app-config/app-config.types.js';
import { ILoggerService } from './common/logger/logger.types.js';
import { IDbClient } from './common/db-client/db-client.types';
import { DbClientService } from './common/db-client/db-client.service';

const applicationContainer = new Container();
applicationContainer
  .bind<Application>(Component.Application)
  .to(Application)
  .inSingletonScope();
applicationContainer
  .bind<ILoggerService>(Component.ILoggerService)
  .to(LoggerService)
  .inSingletonScope();
applicationContainer
  .bind<IConfigService>(Component.IConfigService)
  .to(ConfigService)
  .inSingletonScope();
applicationContainer
  .bind<IDbClient>(Component.IDbClient)
  .to(DbClientService)
  .inSingletonScope();

const app = applicationContainer.get<Application>(Component.Application);
app.init();
