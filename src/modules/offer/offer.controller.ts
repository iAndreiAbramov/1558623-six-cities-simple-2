import { inject, injectable } from 'inversify';
import Controller from '../../common/controller/controller.js';
import { ILoggerService } from '../../common/logger/logger.types';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/router.types.js';
import { Request, Response } from 'express';
import UpdateOfferDto from './dto/update-offer.dto.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import { IOfferService } from './offer.types';
import { ICityService } from '../city/city.types';
import { ICommentService } from '../comments/comment.types';
import { fillDTO } from '../../utils/common.utils.js';
import OfferDetailedResponse from './response/offer-detailed.response.js';
import { ResponseGroup } from '../../types/ResponseGroup.js';
import HttpError from '../../common/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import ValidateObjectIdMiddleware from '../../common/middlewares/validate-objectId.middleware.js';
import ValidateDtoMiddleware from '../../common/middlewares/validate-dto.middleware.js';
import PrivateRouteMiddleware from '../../common/middlewares/private-route.middleware.js';
import CheckOwnerMiddleware from '../../common/middlewares/check-owner.middleware.js';
import DocumentExistsMiddleware from '../../common/middlewares/document-exists.middleware.js';
import OfferBasicResponse from './response/offer-raw.response.js';

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.ILoggerService) logger: ILoggerService,
    @inject(Component.IOfferService) private offerService: IOfferService,
    @inject(Component.ICityService) private cityService: ICityService,
    @inject(Component.ICommentService) private commentService: ICommentService,
  ) {
    super(logger);

    this.logger.info('Registering routes for OfferController');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
    });
    this.addRoute({
      path: '/create',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto),
      ],
    });
    this.addRoute({
      path: '/update/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware({
          service: this.offerService,
          paramName: 'offerId',
          entityName: 'offer',
        }),
        new CheckOwnerMiddleware({
          service: this.offerService,
          paramName: 'offerId',
        }),
      ],
    });
    this.addRoute({
      path: '/details/:offerId',
      method: HttpMethod.Get,
      handler: this.getDetails,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware({
          service: this.offerService,
          paramName: 'offerId',
          entityName: 'offer',
        }),
      ],
    });
    this.addRoute({
      path: '/delete/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware({
          service: this.offerService,
          paramName: 'offerId',
          entityName: 'offer',
        }),
        new CheckOwnerMiddleware({
          service: this.offerService,
          paramName: 'offerId',
        }),
      ],
    });
  }

  private async index(req: Request, res: Response) {
    const { offersNumber } = req.query as { offersNumber: string };
    const offersList = await this.offerService.getList(Number(offersNumber));
    if (!offersList) {
      throw new HttpError({
        httpCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Failed to get offers',
        detail: 'OfferController',
      });
    }

    return this.sendOk(
      res,
      fillDTO(OfferBasicResponse, offersList, [ResponseGroup.OfferBasic]),
    );
  }

  private async create(
    req: Request<unknown, unknown, CreateOfferDto>,
    res: Response,
  ) {
    const existingCity = await this.cityService.findByName(req.body.cityName);
    if (!existingCity) {
      throw new HttpError({
        httpCode: StatusCodes.BAD_REQUEST,
        message: `Invalid city name: '${req.body.cityName}'`,
        detail: 'OfferController',
      });
    }

    const newOffer = await this.offerService.create({
      ...req.body,
      userId: req.body.userId,
      cityId: existingCity.id,
    });
    if (!newOffer) {
      throw new Error('Failed to create offer');
    }

    this.logger.info(`Offer with id ${newOffer.id} created`);
    this.sendCreated(
      res,
      fillDTO(OfferDetailedResponse, newOffer, [
        ResponseGroup.OfferDetails,
        ResponseGroup.OfferBasic,
      ]),
    );
  }

  private async getDetails(req: Request, res: Response) {
    const { offerId } = req.params as { offerId: string };
    const offer = await this.offerService.findById(offerId);
    this.sendOk(
      res,
      fillDTO(OfferDetailedResponse, offer, [
        ResponseGroup.OfferDetails,
        ResponseGroup.OfferBasic,
      ]),
    );
  }

  private async update(
    req: Request<unknown, unknown, UpdateOfferDto>,
    res: Response,
  ) {
    const { offerId } = req.params as { offerId: string };
    const offer = await this.offerService.update(offerId, req.body);
    this.logger.info(`Offer with id ${offerId} updated`);
    this.sendOk(
      res,
      fillDTO(OfferDetailedResponse, offer, [
        ResponseGroup.OfferDetails,
        ResponseGroup.OfferBasic,
      ]),
    );
  }

  private async delete(req: Request, res: Response) {
    const { offerId } = req.params as { offerId: string };
    await this.offerService.deleteById(offerId);
    const deletedCommentsCount = await this.commentService.deleteByOfferId(
      offerId,
    );
    this.logger.info(
      `Offer with id ${offerId} and ${
        deletedCommentsCount || 0
      } comments deleted`,
    );
    this.sendNoContent(res);
  }
}
