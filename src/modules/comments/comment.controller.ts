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
import HttpError from '../../common/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(Component.ILoggerService) logger: ILoggerService,
    @inject(Component.ICommentService) private commentService: ICommentService,
    @inject(Component.IOfferService) private offerService: IOfferService,
  ) {
    super(logger);
    this.logger.info('Registering routes for CommentController');
    this.addRoute({
      path: '/add',
      method: HttpMethod.Post,
      handler: this.addComment,
    });
    this.addRoute({
      path: '/list/:offerId',
      method: HttpMethod.Get,
      handler: this.getList,
    });
  }

  private async getList(req: Request, res: Response) {
    const { offerId } = req.params as { offerId: string };
    try {
      const comments = await this.commentService.getList(offerId);
      this.sendOk(res, fillDTO(CommentResponse, comments));
    } catch {
      throw new HttpError({
        httpCode: StatusCodes.NOT_FOUND,
        message: `Offer with id ${offerId} does not exist`,
        detail: 'CommentController',
      });
    }
  }

  private async addComment(
    req: Request<unknown, unknown, CreateCommentDto>,
    res: Response,
  ) {
    const existingOffer = await this.offerService.findById(req.body.offerId);
    if (!existingOffer) {
      throw new HttpError({
        httpCode: StatusCodes.NOT_FOUND,
        message: `Offer with id ${req.body.offerId} does not exist`,
        detail: 'CommentController',
      });
    }

    const comment = await this.commentService.create(req.body);
    const newRating = await this.commentService
      .getList(existingOffer.id)
      .then((comments) =>
        comments.length > 0
          ? comments.reduce((acc, cur) => acc + cur.rating, 0) / comments.length
          : 0,
      );
    await this.offerService.updateCommentsCountAndRating(
      existingOffer.id,
      newRating,
    );
    this.sendCreated(res, fillDTO(CommentResponse, comment));
  }
}