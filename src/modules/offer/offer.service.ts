import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { IOfferService } from './offer.types';
import { ILoggerService } from '../../common/logger/logger.types';
import { Component } from '../../types/component.types.js';
import { OfferEntity } from './offer.entity.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import { DEFAULT_OFFERS_NUMBER } from '../../constants/common.constants.js';
import UpdateOfferDto from './dto/update-offer.dto.js';

@injectable()
export default class OfferService implements IOfferService {
  constructor(
    @inject(Component.ILoggerService) private readonly logger: ILoggerService,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    let newOffer = await this.offerModel.create(dto);
    if (newOffer) {
      newOffer = await newOffer.populate(['hostId', 'cityId']);
      this.logger.info(`New city with title ${dto.title} created`);
      return newOffer;
    }

    this.logger.error(`Failed to create an offer ${dto.title}`);
    return null;
  }

  async update(dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(dto.offerId, dto, {
        new: true,
      })
      .populate(['hostId', 'cityId']);
  }

  async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).populate(['hostId', 'cityId']);
  }

  async deleteById(offerId: string): Promise<null> {
    return this.offerModel.findOneAndDelete({ _id: offerId });
  }

  async updateCommentsCountAndRating(
    offerId: string,
    rating: number,
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(
      offerId,
      {
        $inc: { commentCount: 1 },
        rating,
      },
      { new: true },
    );
  }

  async getList(offersNumber?: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .populate('cityId')
      .limit(offersNumber || DEFAULT_OFFERS_NUMBER);
  }

  async exists(documentId: string): Promise<boolean> {
    const existingEntity = await this.offerModel.findById(documentId);
    return !!existingEntity;
  }
}
