import Controller from '../../common/controller/controller.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.types.js';
import { ILoggerService } from '../../common/logger/logger.types';
import { HttpMethod } from '../../types/router.types.js';
import { IUserService } from './user.types';
import CreateUserDto from './dto/create-user.dto.js';
import { IConfigService } from '../../common/config-service/config-service.types';
import { Request, Response } from 'express';
import HttpError from '../../common/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../utils/common.utils.js';
import UserResponse from './user.response.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import ValidateDtoMiddleware from '../../common/middlewares/validate-dto.middleware.js';
import ValidateObjectIdMiddleware from '../../common/middlewares/validate-objectId.middleware.js';
import { UploadFileMiddleware } from '../../common/middlewares/upload-file.middleware.js';

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
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)],
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)],
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(
          this.configService.get('UPLOAD_DIRECTORY'),
          'avatar',
        ),
      ],
    });
  }

  private async create(
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

  async uploadAvatar(req: Request, res: Response) {
    this.logger.info('Saving file');
    this.sendCreated(res, {
      filepath: req.file?.path,
    });
  }
}
