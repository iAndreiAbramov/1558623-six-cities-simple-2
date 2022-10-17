import { IMiddleware } from '../../types/middleware.types';
import { NextFunction, Request, Response } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { StatusCodes } from 'http-status-codes';

export default class ValidateDtoMiddleware implements IMiddleware {
  constructor(private dto: ClassConstructor<object>) {}

  async execute(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const dtoInstance = plainToInstance(this.dto, req.body);
    const errors = await validate(dtoInstance, { skipMissingProperties: true });
    const errorConstraints = errors.map((error) => error.constraints);

    if (errors.length > 0) {
      res.status(StatusCodes.BAD_REQUEST).send(errorConstraints);
      return;
    }
    next();
  }
}
