import { ApartmentType } from '../../../types/apartment.types';
import { Good } from '../../../types/good.types';

export default class UpdateOfferDto {
  offerId!: string;
  title?: string;
  description?: string;
  cityId?: string;
  previewImage?: string;
  photos?: string[];
  isPremium?: boolean;
  rating?: number;
  type?: ApartmentType;
  roomsNumber?: number;
  guestsNumber?: number;
  price?: number;
  goods?: Good[];
  hostId?: string;
  coordinates?: number[];
}
