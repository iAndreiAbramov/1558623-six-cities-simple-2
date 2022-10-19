import { IDocumentExists } from '../../types/document-exists.interface';
import { NextFunction, Request, Response } from 'express';
import { IMiddleware } from '../../types/middleware.types';
import HttpError from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

export default class DocumentExistsMiddleware implements IMiddleware {
  private readonly service: IDocumentExists;
  private readonly paramName: string;
  private readonly entityName: string;

  constructor({
    service,
    paramName,
    entityName,
  }: {
    service: IDocumentExists;
    paramName: string;
    entityName: string;
  }) {
    this.service = service;
    this.paramName = paramName;
    this.entityName = entityName;
  }

  async execute(
    { body, query, params }: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    const documentId =
      params[this.paramName] || body[this.paramName] || query[this.paramName];

    if (!(await this.service.exists(documentId))) {
      throw new HttpError({
        httpCode: StatusCodes.BAD_REQUEST,
        message: `${this.entityName} with id ${documentId} not found`,
        detail: 'DocumentExistsMiddleware',
      });
    }

    next();
  }
}
