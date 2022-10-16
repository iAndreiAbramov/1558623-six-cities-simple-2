import mongoose from 'mongoose';
import { IMiddleware } from '../../types/middleware.types';
import { NextFunction, Request, Response } from 'express';
import HttpError from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

const { Types } = mongoose;

export default class ValidateObjectIdMiddleware implements IMiddleware {
  constructor(private param: string) {}

  execute(req: Request, _res: Response, next: NextFunction) {
    const objectId = req.params[this.param];

    if (Types?.ObjectId.isValid(objectId)) {
      return next();
    }

    throw new HttpError({
      httpCode: StatusCodes.BAD_REQUEST,
      message: `${objectId} is invalid objectId`,
      detail: 'ValidateObjectIdMiddleware',
    });
  }
}
