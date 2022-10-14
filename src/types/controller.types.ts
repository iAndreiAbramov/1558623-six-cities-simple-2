import { Response, Router } from 'express';
import { IRoute } from './router.types';

export interface IController {
  readonly router: Router;
  readonly addRoute: (route: IRoute) => void;
  readonly send: <T>(res: Response, statusCode: number, data: T) => void;
  readonly sendOk: <T>(res: Response, data: T) => void;
  readonly sendCreated: <T>(res: Response, data: T) => void;
  readonly sendNoContent: <T>(res: Response, data: T) => void;
}
