import { DocumentType, Ref } from '@typegoose/typegoose';
import { ApartmentType } from '../../types/apartment.types';
import { Good } from '../../types/good.types';
import { CityEntity } from '../city/city.entity';
import { UserEntity } from '../user/user.entity';
import CreateOfferDto from './dto/create-offer.dto';
import { OfferEntity } from './offer.entity';
import UpdateOfferDto from './dto/update-offer.dto';

export interface IOffer {
  title: string;
  description: string;
  cityId: Ref<CityEntity>;
  previewImage: string;
  photos: string[];
  isPremium: boolean;
  rating: number;
  type: ApartmentType;
  roomsNumber: number;
  guestsNumber: number;
  price: number;
  goods: Good[];
  hostId: Ref<UserEntity>;
  coordinates: number[];
}

export interface IOfferService {
  create: (dto: CreateOfferDto) => Promise<DocumentType<OfferEntity>>;
  update: (dto: UpdateOfferDto) => Promise<DocumentType<OfferEntity> | null>;
  findById: (id: string) => Promise<DocumentType<OfferEntity> | null>;
  deleteById: (offerId: string) => Promise<string | null>;
  getList: (offersNumber?: number) => Promise<DocumentType<OfferEntity>[]>;
}
