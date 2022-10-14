import { inject, injectable } from 'inversify';
import { IExceptionFilter } from './exception-filter.types';
import { Component } from '../../types/component.types.js';
import { ILoggerService } from '../logger/logger.types';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpError from './http-error.js';
import { createErrorObject } from '../../utils/common.utils.js';

@injectable()
export default class ExceptionFilter implements IExceptionFilter {
  constructor(
    @inject(Component.ILoggerService) private logger: ILoggerService,
  ) {}

  private handleHttpError(
    error: HttpError,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const {httpCode, message, detail} = error;
    this.logger.error(
      `[${detail}]: ${httpCode} — ${message}`,
    );
    res
      .status(httpCode)
      .json(createErrorObject(message));
  }

  private handleCommonError(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    this.logger.error(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(error.message));
  }

  catch(
    error: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (error instanceof HttpError) {
      return this.handleHttpError(error, req, res, next);
    }

    return this.handleCommonError(error, req, res, next);
  }
}
