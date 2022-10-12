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
import { IConfigService } from './common/app-config/config-service.types';
import { ILoggerService } from './common/logger/logger.types.js';
import { IDbClient } from './common/db-client/db-client.types';
import { IUserService } from './modules/user/user.types';
import { ICityService } from './modules/city/city.types';
import { UserEntity, UserModel } from './modules/user/user.entity.js';
import { CityEntity, CityModel } from './modules/city/city.entity.js';
import { OfferEntity, OfferModel } from './modules/offer/offer.entity.js';
import {
  CommentEntity,
  CommentModel,
} from './modules/comments/comment.entity.js';
import CommentService from './modules/comments/comment.service.js';
import { ICommentService } from './modules/comments/comment.types';
import OfferController from './modules/offer/offer.controller.js';
import { IController } from './types/controller.types';
import { IOfferService } from './modules/offer/offer.types';
import OfferService from './modules/offer/offer.service.js';
import ExceptionFilter from './common/errors/exception-filter.js';
import { IExceptionFilter } from './common/errors/exception-filter.types';
import UserController from './modules/user/user.controller.js';
import CommentController from './modules/comments/comment.controller.js';

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
applicationContainer
  .bind<IOfferService>(Component.IOfferService)
  .to(OfferService);
applicationContainer
  .bind<ICommentService>(Component.ICommentService)
  .to(CommentService);
applicationContainer
  .bind<types.ModelType<CommentEntity>>(Component.CommentModel)
  .toConstantValue(CommentModel);
applicationContainer
  .bind<IController>(Component.OfferController)
  .to(OfferController)
  .inSingletonScope();
applicationContainer
  .bind<IController>(Component.UserController)
  .to(UserController)
  .inSingletonScope();
applicationContainer
  .bind<IController>(Component.CommentController)
  .to(CommentController);
applicationContainer
  .bind<IExceptionFilter>(Component.IExceptionFilter)
  .to(ExceptionFilter)
  .inSingletonScope();
const app = applicationContainer.get<Application>(Component.Application);
await app.init();
