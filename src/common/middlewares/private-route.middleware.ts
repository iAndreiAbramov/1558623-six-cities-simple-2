import { IMiddleware } from '../../types/middleware.types';
import { NextFunction, Request, Response } from 'express';
import HttpError from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

export default class PrivateRouteMiddleware implements IMiddleware {
  execute(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): void | Promise<void> {
    if (!req.body.userId) {
      return next(
        new HttpError({
          httpCode: StatusCodes.UNAUTHORIZED,
          message: 'Unauthorized',
          detail: 'PrivateRouteMiddleware',
        }),
      );
    }

    return next();
  }
}
