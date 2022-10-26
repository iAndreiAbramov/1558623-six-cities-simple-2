import { IMiddleware } from '../../types/middleware.types';
import { NextFunction, Request, Response } from 'express';
import HttpError from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

export default class PublicRouteMiddleware implements IMiddleware {
  async execute(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    if (req.body.userId) {
      return next(
        new HttpError({
          httpCode: StatusCodes.FORBIDDEN,
          message: 'Please log out to perform this action',
          detail: 'PublicRouteMiddleware',
        }),
      );
    }

    return next();
  }
}
