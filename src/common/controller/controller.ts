import { IController } from '../../types/controller.types';
import { injectable } from 'inversify';
import { Response, Router } from 'express';
import { ILoggerService } from '../logger/logger.types';
import { IRoute } from '../../types/router.types';
import { StatusCodes } from 'http-status-codes';

@injectable()
export default abstract class Controller implements IController {
  private readonly _router: Router;

  constructor(protected readonly logger: ILoggerService) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(route: IRoute) {
    this._router[route.method](route.path, route.handler.bind(this));
    this.logger.info(
      `Route registered: ${route.method.toUpperCase()} ${route.path}`,
    );
  }

  public send<T>(res: Response, statusCode: number, data: T) {
    res.type('application/json').status(statusCode).json(data);
  }

  public sendOk<T>(res: Response, data: T) {
    this.send(res, StatusCodes.OK, data);
  }

  public sendCreated<T>(res: Response, data: T) {
    this.send(res, StatusCodes.CREATED, data);
  }

  public sendNoContent<T>(res: Response, data: T) {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

  public sendNotFound(res: Response) {
    res.status(StatusCodes.NOT_FOUND);
  }
}
