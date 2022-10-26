import { IMiddleware } from '../../types/middleware.types';
import { NextFunction, Request, Response } from 'express';
import { IGetOwnerId } from '../../types/get-owner-id.interface';
import HttpError from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

export default class CheckOwnerMiddleware implements IMiddleware {
  private readonly service: IGetOwnerId;
  private readonly paramName: string;

  constructor({
    service,
    paramName,
  }: {
    service: IGetOwnerId;
    paramName: string;
  }) {
    this.service = service;
    this.paramName = paramName;
  }

  async execute(
    { body, query, params }: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    const ownerId = body.userId;
    const entityId =
      body[this.paramName] || query[this.paramName] || params[this.paramName];
    const receivedOwnerId = await this.service.getOwnerId(entityId);
    if (receivedOwnerId !== ownerId) {
      return next(
        new HttpError({
          httpCode: StatusCodes.FORBIDDEN,
          message: 'Access denied, this is not yours',
          detail: 'CheckOwnerMiddleware',
        }),
      );
    }

    return next();
  }
}
