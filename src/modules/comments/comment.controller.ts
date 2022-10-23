import Controller from '../../common/controller/controller.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.types.js';
import { ILoggerService } from '../../common/logger/logger.types';
import { ICommentService } from './comment.types';
import { Request, Response } from 'express';
import CreateCommentDto from './dto/create-comment.dto.js';
import { fillDTO } from '../../utils/common.utils.js';
import CommentResponse from './comment.response.js';
import { HttpMethod } from '../../types/router.types.js';
import { IOfferService } from '../offer/offer.types';
import ValidateObjectIdMiddleware from '../../common/middlewares/validate-objectId.middleware.js';
import ValidateDtoMiddleware from '../../common/middlewares/validate-dto.middleware.js';
import DocumentExistsMiddleware from '../../common/middlewares/document-exists.middleware.js';
import { IUserService } from '../user/user.types';

@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(Component.ILoggerService) logger: ILoggerService,
    @inject(Component.ICommentService) private commentService: ICommentService,
    @inject(Component.IOfferService) private offerService: IOfferService,
    @inject(Component.IUserService) private userService: IUserService,
  ) {
    super(logger);
    this.logger.info('Registering routes for CommentController');
    this.addRoute({
      path: '/add',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateCommentDto),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateObjectIdMiddleware('userId'),
        new DocumentExistsMiddleware({
          service: this.offerService,
          paramName: 'offerId',
          entityName: 'offer',
        }),
        new DocumentExistsMiddleware({
          service: this.userService,
          paramName: 'userId',
          entityName: 'user',
        }),
      ],
    });
    this.addRoute({
      path: '/list/:offerId',
      method: HttpMethod.Get,
      handler: this.getList,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware({
          service: this.offerService,
          paramName: 'offerId',
          entityName: 'offer',
        }),
      ],
    });
  }

  private async getList(req: Request, res: Response) {
    const { offerId } = req.params as { offerId: string };
    const comments = await this.commentService.getList(offerId);
    this.sendOk(res, fillDTO(CommentResponse, comments));
  }

  private async create(
    req: Request<unknown, unknown, CreateCommentDto>,
    res: Response<CommentResponse>,
  ) {
    const existingOffer = await this.offerService.findById(req.body.offerId);
    const comment = await this.commentService.create({
      ...req.body,
      userId: req.body.userId,
    });
    const newRating = await this.commentService
      .getList(existingOffer?.id)
      .then((comments) =>
        comments.length > 0
          ? comments.reduce((acc, cur) => acc + cur.rating, 0) / comments.length
          : 0,
      );
    await this.offerService.updateCommentsCountAndRating(
      existingOffer?.id,
      newRating,
    );
    this.sendCreated(res, fillDTO(CommentResponse, comment));
  }
}
