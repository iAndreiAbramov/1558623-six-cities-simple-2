import 'reflect-metadata';
import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import Application from './app/application.js';
import { Component } from './types/component.types.js';
import LoggerService from './common/logger/logger.service.js';
import ConfigService from './common/app-config/config.service.js';
import UserService from './modules/user/user.service.js';
import CityService from './modules/city/city.service.js';
import DbClientService from './common/db-client/db-client.service.js';
import { IConfigService } from './common/app-config/app-config.types.js';
import { ILoggerService } from './common/logger/logger.types.js';
import { IDbClient } from './common/db-client/db-client.types';
import { IUserService } from './modules/user/user.types';
import { ICityService } from './modules/city/city.types';
import { UserEntity, UserModel } from './modules/user/user.entity.js';
import { CityEntity, CityModel } from './modules/city/city.entity.js';
import { OfferEntity, OfferModel } from './modules/offer/offer.entity.js';
import { CommentEntity, CommentModel } from './modules/comments/comment.entity';
import CommentService from './modules/comments/comment.service';
import { ICommentService } from './modules/comments/comment.types';

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
applicationContainer
  .bind<types.ModelType<UserEntity>>(Component.UserModel)
  .toConstantValue(UserModel);
applicationContainer.bind<IUserService>(Component.IUserService).to(UserService);
applicationContainer
  .bind<types.ModelType<CityEntity>>(Component.CityModel)
  .toConstantValue(CityModel);
applicationContainer.bind<ICityService>(Component.ICityService).to(CityService);
applicationContainer
  .bind<types.ModelType<OfferEntity>>(Component.OfferModel)
  .toConstantValue(OfferModel);
applicationContainer.bind<ICommentService>(Component.ICommentService).to(CommentService);
applicationContainer
  .bind<types.ModelType<CommentEntity>>(Component.CommentModel)
  .toConstantValue(CommentModel);

const app = applicationContainer.get<Application>(Component.Application);
await app.init();
