import 'reflect-metadata';
import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import Application from './app/application.js';
import { Component } from './types/component.types.js';
import LoggerService from './common/logger/logger.service.js';
import { ConfigService } from './common/app-config/config.service.js';
import { IConfigService } from './common/app-config/app-config.types.js';
import { ILoggerService } from './common/logger/logger.types.js';
import { IDbClient } from './common/db-client/db-client.types';
import { DbClientService } from './common/db-client/db-client.service.js';
import { IUserService } from './modules/user/user.types';
import UserService from './modules/user/user.service.js';
import { UserEntity, UserModel } from './modules/user/user.entity';
import { CityEntity, CityModel } from './modules/city/city.entity';
import CityService from './modules/city/city.service';
import { ICityService } from './modules/city/city.types';
import { GoodEntity, GoodModel } from './modules/good/good.entity';
import { IGoodService } from './modules/good/good.types';
import GoodService from './modules/good/good.service';
import {
  ApartmentEntity,
  ApartmentModel,
} from './modules/apartment/apartment.entity';
import ApartmentService from './modules/apartment/apartment.service';
import { IApartmentService } from './modules/apartment/apartment.types';

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
  .bind<types.ModelType<GoodEntity>>(Component.GoodModel)
  .toConstantValue(GoodModel);
applicationContainer.bind<IGoodService>(Component.IGoodService).to(GoodService);
applicationContainer
  .bind<types.ModelType<ApartmentEntity>>(Component.ApartmentModel)
  .toConstantValue(ApartmentModel);
applicationContainer
  .bind<IApartmentService>(Component.IApartmentService)
  .to(ApartmentService);

const app = applicationContainer.get<Application>(Component.Application);
await app.init();
