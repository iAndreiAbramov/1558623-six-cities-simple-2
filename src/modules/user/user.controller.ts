import Controller from '../../common/controller/controller.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.types.js';
import { ILoggerService } from '../../common/logger/logger.types';
import { HttpMethod } from '../../types/router.types.js';
import { IUserService } from './user.types';
import CreateUserDto from './dto/create-user.dto.js';
import { IConfigService } from '../../common/app-config/config-service.types';
import { Request, Response } from 'express';
import HttpError from '../../common/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../utils/common.utils.js';
import UserResponse from './user.response.js';
import { LoginUserDto } from './dto/login-user.dto';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(Component.ILoggerService) logger: ILoggerService,
    @inject(Component.IUserService) private userService: IUserService,
    @inject(Component.IConfigService) private configService: IConfigService,
  ) {
    super(logger);

    this.logger.info('Registering routes for UserController');
    this.addRoute({
      path: '/create',
      method: HttpMethod.Post,
      handler: this.createUser,
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
    });
  }

  private async createUser(
    req: Request<unknown, unknown, CreateUserDto>,
    res: Response,
  ) {
    const existingUser = await this.userService.findByEmail(req.body.email);
    if (existingUser) {
      throw new HttpError({
        httpCode: StatusCodes.CONFLICT,
        message: `User with email ${req.body.email} already exists`,
        detail: 'UserController',
      });
    }

    const newUser = await this.userService.create(
      req.body,
      this.configService.get('SALT'),
    );
    this.sendCreated(res, fillDTO(UserResponse, newUser));
  }

  private async login(req: Request<unknown, unknown, LoginUserDto>) {
    const existingUser = await this.userService.findByEmail(req.body.email);
    if (!existingUser) {
      throw new HttpError({
        httpCode: StatusCodes.UNAUTHORIZED,
        message: `User with email ${req.body.email} not found`,
      });
    }

    throw new HttpError({
      httpCode: StatusCodes.NOT_IMPLEMENTED,
      message: 'Not implemented',
      detail: 'UserController',
    });
  }
}