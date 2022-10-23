import { IMiddleware } from '../../types/middleware.types';
import { NextFunction, Request, Response } from 'express';
import * as jose from 'jose';
import { createSecretKey } from 'crypto';
import HttpError from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

export class AuthenticateMiddleware implements IMiddleware {
  constructor(readonly jwtSecret: string) {}

  async execute(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    const authorizationHeader = req.headers.authorization?.split(' ');
    if (!authorizationHeader) {
      return next();
    }

    const [, token] = authorizationHeader;

    try {
      const { payload } = await jose.jwtVerify(
        token,
        createSecretKey(this.jwtSecret, 'utf-8'),
      );
      req.body = {
        ...req.body,
        userId: payload.userId,
      };

      return next();
    } catch {
      return next(
        new HttpError({
          httpCode: StatusCodes.UNAUTHORIZED,
          message: 'Invalid token',
          detail: 'AuthenticateMiddleware',
        }),
      );
    }
  }
}
