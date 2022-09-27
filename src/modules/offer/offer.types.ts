import { DocumentType, Ref } from '@typegoose/typegoose';
import { ApartmentType } from '../../types/apartment.types';
import { Good } from '../../types/good.types';
import { CityEntity } from '../city/city.entity';
import { UserEntity } from '../user/user.entity';
import CreateOfferDto from './dto/create-offer.dto';
import { OfferEntity } from './offer.entity';

export interface IOffer {
  title: string;
  description: string;
  dateOfCreation: string;
  city: Ref<CityEntity>;
  previewImage: string;
  photos: string[];
  isPremium: boolean;
  rating: number;
  type: ApartmentType;
  roomsNumber: number;
  guestsNumber: number;
  price: number;
  goods: Good[];
  host: Ref<UserEntity>;
  latitude: number;
  longitude: number;
}

export interface IOfferService {
  create: (dto: CreateOfferDto) => Promise<DocumentType<OfferEntity>>;
  findById: (id: string) => Promise<DocumentType<OfferEntity> | null>;
}
