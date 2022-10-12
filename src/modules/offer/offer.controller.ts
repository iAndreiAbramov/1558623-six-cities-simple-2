import { inject, injectable } from 'inversify';
import Controller from '../../common/controller/controller.js';
import { ILoggerService } from '../../common/logger/logger.types';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/router.types.js';
import { Request, Response } from 'express';
import { IOfferService } from './offer.types';
import UpdateOfferDto from './dto/update-offer.dto';
import CreateOfferDto from './dto/create-offer.dto';
import { ICityService } from '../city/city.types';
import { fillDTO } from '../../utils/common.utils.js';
import OfferResponse from './offer.response.js';
import { ResponseGroup } from '../../types/ResponseGroup.js';

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
      path: '/:offersNumber',
      method: HttpMethod.Get,
      handler: this.index,
    });
    this.addRoute({
      path: '/create',
      method: HttpMethod.Post,
      handler: this.createOffer,
    });
    this.addRoute({
      path: '/update',
      method: HttpMethod.Patch,
      handler: this.updateOffer,
    });
    this.addRoute({
      path: '/details/:offerId',
      method: HttpMethod.Get,
      handler: this.getOfferDetails,
    });
    this.addRoute({
      path: '/delete/:offerId',
      method: HttpMethod.Delete,
      handler: this.deleteOffer,
    });
  }

  async index(req: Request, res: Response) {
    const { offersNumber } = req.params as { offersNumber: string };
    const offersList = await this.offerService.getList(Number(offersNumber));
    if (!offersList) {
      throw new Error('Failed to get offers');
    }

    return this.sendOk(res, fillDTO(OfferResponse, offersList));
  }

  async createOffer(
    req: Request<unknown, unknown, CreateOfferDto>,
    res: Response,
  ) {
    // TODO: удалить после перехода на валидацию в middleware
    const existingCity = await this.cityService.findByName(req.body.cityName);
    if (!existingCity) {
      throw new Error('Invalid city name');
    }

    const newOffer = await this.offerService.create({
      ...req.body,
      city: existingCity.id,
    });
    // TODO: удалить после перехода на валидацию в middleware
    if (!newOffer) {
      throw new Error('Failed to create offer');
    }

    return this.sendCreated(
      res,
      fillDTO(OfferResponse, newOffer, [ResponseGroup.OfferDetails]),
    );
  }

  async getOfferDetails(req: Request, res: Response) {
    const { offerId } = req.params as { offerId: string };
    const offer = await this.offerService.findById(offerId);
    // TODO: удалить после перехода на валидацию в middleware
    if (!offer) {
      throw new Error('Offer does not exist');
    }

    return this.sendOk(
      res,
      fillDTO(OfferResponse, offer, [ResponseGroup.OfferDetails]),
    );
  }

  async updateOffer(
    req: Request<unknown, unknown, UpdateOfferDto>,
    res: Response,
  ) {
    const offer = await this.offerService.update(req.body);
    // TODO: удалить после перехода на валидацию в middleware
    if (!offer) {
      throw new Error('Offer does not exist');
    }

    this.sendOk(
      res,
      fillDTO(OfferResponse, offer, [ResponseGroup.OfferDetails]),
    );
  }

  async deleteOffer(req: Request, res: Response) {
    const { offerId } = req.params as { offerId: string };
    const result = await this.offerService.deleteById(offerId);
    // TODO: удалить после перехода на валидацию в middleware
    if (!result) {
      throw new Error('Offer not found');
    }
    this.sendNoContent(res, result);
  }
}
