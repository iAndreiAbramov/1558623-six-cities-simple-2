import { Response, Router } from 'express';
import { IRoute } from './router.types';

export interface IController {
  readonly router: Router;
  readonly addRoute: (route: IRoute) => void;
  readonly send: <T>(res: Response, statusCode: number, data: T) => void;
  readonly ok: <T>(res: Response, data: T) => void;
  readonly create: <T>(res: Response, data: T) => void;
  readonly noContent: <T>(res: Response, data: T) => void;
}
