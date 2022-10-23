import { inject, injectable } from 'inversify';
import Controller from '../../common/controller/controller.js';
import { ILoggerService } from '../../common/logger/logger.types';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/router.types.js';
import { Request, Response } from 'express';
import { IOfferService } from './offer.types';
import UpdateOfferDto from './dto/update-offer.dto.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import { ICityService } from '../city/city.types';
import { fillDTO } from '../../utils/common.utils.js';
import OfferResponse from './offer.response.js';
import { ResponseGroup } from '../../types/ResponseGroup.js';
import HttpError from '../../common/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import ValidateObjectIdMiddleware from '../../common/middlewares/validate-objectId.middleware.js';
import ValidateDtoMiddleware from '../../common/middlewares/validate-dto.middleware.js';
import PrivateRouteMiddleware from '../../common/middlewares/private-route.middleware.js';

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.ILoggerService) logger: ILoggerService,
    @inject(Component.IOfferService) private offerService: IOfferService,
    @inject(Component.ICityService) private cityService: ICityService,
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
      path: '/update',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new ValidateObjectIdMiddleware('offerId'),
      ],
    });
    this.addRoute({
      path: '/details/:offerId',
      method: HttpMethod.Get,
      handler: this.getDetails,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
    this.addRoute({
      path: '/delete/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
      ],
    });
  }

  private async index(req: Request, res: Response) {
    const { offersNumber } = req.query as { offersNumber: string };
    const offersList = await this.offerService.getList(Number(offersNumber));
    if (!offersList) {
      throw new Error('Failed to get offers');
    }

    return this.sendOk(res, fillDTO(OfferResponse, offersList));
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
      hostId: req.body.userId,
      cityId: existingCity.id,
    });
    if (!newOffer) {
      throw new Error('Failed to create offer');
    }

    this.sendCreated(
      res,
      fillDTO(OfferResponse, newOffer, [ResponseGroup.OfferDetails]),
    );
  }

  private async getDetails(req: Request, res: Response) {
    const { offerId } = req.params as { offerId: string };
    try {
      const offer = await this.offerService.findById(offerId);
      this.sendOk(
        res,
        fillDTO(OfferResponse, offer, [ResponseGroup.OfferDetails]),
      );
    } catch (error) {
      throw new HttpError({
        httpCode: StatusCodes.NOT_FOUND,
        message: `Offer with id '${offerId}' does not exist`,
        detail: 'OfferController',
      });
    }
  }

  private async update(
    req: Request<unknown, unknown, UpdateOfferDto>,
    res: Response,
  ) {
    try {
      const offer = await this.offerService.update(req.body);
      this.sendOk(
        res,
        fillDTO(OfferResponse, offer, [ResponseGroup.OfferDetails]),
      );
    } catch {
      throw new HttpError({
        httpCode: StatusCodes.NOT_FOUND,
        message: `Offer with id '${req.body.offerId}' does not exist`,
        detail: 'OfferController',
      });
    }
  }

  private async delete(req: Request, res: Response) {
    const { offerId } = req.params as { offerId: string };
    const result = await this.offerService.deleteById(offerId);
    if (!result) {
      throw new HttpError({
        httpCode: StatusCodes.NOT_FOUND,
        message: `Offer with id '${offerId}' does not exist`,
        detail: 'OfferController',
      });
    }
    this.sendNoContent(res, result);
  }
}
