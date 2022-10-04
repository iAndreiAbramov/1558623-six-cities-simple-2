import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { IOfferService } from './offer.types';
import { Component } from '../../types/component.types.js';
import { ILoggerService } from '../../common/logger/logger.types.js';
import { OfferEntity } from './offer.entity.js';
import CreateOfferDto from './dto/create-offer.dto';
import { DEFAULT_OFFERS_NUMBER } from '../../constants/common.constants';
import UpdateOfferDto from './dto/update-offer.dto';

@injectable()
export default class OfferService implements IOfferService {
  constructor(
    @inject(Component.ILoggerService) private readonly logger: ILoggerService,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const newOffer = await this.offerModel.create(dto);
    this.logger.info(`New city with title ${dto.title} created`);
    return newOffer;
  }

  async update(dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findOneAndUpdate({ id: dto.offerId }, dto, {
      new: true,
    });
  }

  async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId);
  }

  async deleteById(offerId: string): Promise<string | null> {
    return this.offerModel.findOneAndDelete(
      { offerId },
      (doc: DocumentType<OfferEntity>) => doc.id,
    );
  }

  async getList(offersNumber?: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({
        id: 1,
        title: 1,
        type: 1,
        rating: 1,
        price: 1,
        cityId: 1,
        previewImage: 1,
        isPremium: 1,
      })
      .populate('cityId')
      .limit(offersNumber || DEFAULT_OFFERS_NUMBER);
  }
}
