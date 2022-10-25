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
import { createJWT, fillDTO } from '../../utils/common.utils.js';
import UserResponse from './user.response.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import ValidateDtoMiddleware from '../../common/middlewares/validate-dto.middleware.js';
import ValidateObjectIdMiddleware from '../../common/middlewares/validate-objectId.middleware.js';
import { UploadFileMiddleware } from '../../common/middlewares/upload-file.middleware.js';
import LoggedUserResponse from './logged-user.response.js';
import PrivateRouteMiddleware from '../../common/middlewares/private-route.middleware.js';
import DocumentExistsMiddleware from '../../common/middlewares/document-exists.middleware.js';

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
      path: '/check',
      method: HttpMethod.Post,
      handler: this.checkAuthentication,
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('userId'),
        new DocumentExistsMiddleware({
          service: this.userService,
          paramName: 'userId',
          entityName: 'user',
        }),
        new UploadFileMiddleware(
          this.configService.get('UPLOAD_DIRECTORY'),
          'avatar',
        ),
      ],
    });
  }

  private async create(
    req: Request<unknown, unknown, CreateUserDto>,
    res: Response<UserResponse>,
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

  private async login(
    req: Request<unknown, unknown, LoginUserDto>,
    res: Response<LoggedUserResponse>,
  ) {
    const existingUser = await this.userService.verifyUser(
      req.body,
      this.configService.get('SALT'),
    );
    if (!existingUser) {
      throw new HttpError({
        httpCode: StatusCodes.UNAUTHORIZED,
        message: 'Unauthorized',
        detail: 'UserController',
      });
    }

    const token = await createJWT({
      algorithm: 'HS256',
      jwtSecret: this.configService.get('JWT_SECRET'),
      payload: { email: existingUser.email, userId: existingUser.id },
    });

    this.sendOk(
      res,
      fillDTO(LoggedUserResponse, { email: existingUser.email, token }),
    );
  }

  private async checkAuthentication(
    req: Request,
    res: Response,
  ): Promise<void> {
    const existingUser = await this.userService.findById(req.body.userId);
    if (!existingUser) {
      throw new HttpError({
        httpCode: StatusCodes.UNAUTHORIZED,
        message: 'Unauthorized',
        detail: 'UserController',
      });
    }

    return this.sendOk(res, fillDTO(LoggedUserResponse, existingUser));
  }

  async uploadAvatar(req: Request, res: Response) {
    const { userId } = req.params as { userId: string };
    const { avatar } = req.body as { avatar: string };
    const updatedUser = await this.userService.updateAvatar(userId, avatar);
    if (!updatedUser) {
      throw new HttpError({
        httpCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Failed to update user avatar',
        detail: 'UserController',
      });
    }

    this.logger.info(`User with id ${userId} avatar updated ${avatar}`);
    this.sendCreated(res, fillDTO(UserResponse, updatedUser));
  }
}
