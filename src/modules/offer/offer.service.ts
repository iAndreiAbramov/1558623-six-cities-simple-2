import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { IOfferService } from './offer.types';
import { Component } from '../../types/component.types';
import { ILoggerService } from '../../common/logger/logger.types';
import { OfferEntity } from './offer.entity';
import CreateOfferDto from './dto/create-offer.dto';

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

  async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId);
  }
}
