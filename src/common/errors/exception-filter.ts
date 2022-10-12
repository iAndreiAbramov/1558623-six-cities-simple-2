import { inject, injectable } from 'inversify';
import { IExceptionFilter } from './exception-filter.types';
import { Component } from '../../types/component.types.js';
import { ILoggerService } from '../logger/logger.types';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

@injectable()
export default class ExceptionFilter implements IExceptionFilter {
  constructor(
    @inject(Component.ILoggerService) private logger: ILoggerService,
  ) {}

  catch(error: Error, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}
