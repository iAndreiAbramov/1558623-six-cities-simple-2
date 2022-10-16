import { NextFunction, Request, Response } from 'express';
import { IMiddleware } from './middleware.types';

export enum HttpMethod {
  Get = 'get',
  Post = 'post',
  Patch = 'patch',
  Delete = 'delete',
}

export interface IRoute {
  path: string;
  method: HttpMethod;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: IMiddleware[];
}
