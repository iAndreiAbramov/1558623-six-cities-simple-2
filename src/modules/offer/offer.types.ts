import { DocumentType, Ref } from '@typegoose/typegoose';
import { ApartmentType } from '../../types/apartment.types';
import { Good } from '../../types/good.types';
import { CityEntity } from '../city/city.entity';
import { UserEntity } from '../user/user.entity';
import CreateOfferDto from './dto/create-offer.dto';
import { OfferEntity } from './offer.entity';
import UpdateOfferDto from './dto/update-offer.dto';
import { CityName } from '../../types/cities.types';

export interface IOfferCreate {
  title: string;
  description: string;
  cityId: Ref<CityEntity>;
  previewImage: string;
  photos: string[];
  isPremium: boolean;
  type: ApartmentType;
  roomsNumber: number;
  guestsNumber: number;
  price: number;
  goods: Good[];
  hostId: Ref<UserEntity>;
  cityName: CityName;
  coordinates?: number[];
  rating?: number;
  commentCount: number;
}

export interface IOfferService {
  create: (dto: CreateOfferDto) => Promise<DocumentType<OfferEntity> | null>;
  update: (dto: UpdateOfferDto) => Promise<DocumentType<OfferEntity> | null>;
  findById: (id: string) => Promise<DocumentType<OfferEntity> | null>;
  deleteById: (offerId: string) => Promise<null>;
  getList: (offersNumber?: number) => Promise<DocumentType<OfferEntity>[]>;
  updateCommentsCountAndRating: (
    offerId: string,
    rating: number,
  ) => Promise<DocumentType<OfferEntity> | null>;
}
