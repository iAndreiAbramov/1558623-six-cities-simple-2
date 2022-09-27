import { ApartmentType } from '../../../types/apartment.types';
import { Good } from '../../../types/good.types';

export default class CreateOfferDto {
  title!: string;
  description!: string;
  dateOfCreation!: string;
  cityId!: string;
  previewImage!: string;
  photos!: string[];
  isPremium!: boolean;
  rating!: number;
  type!: ApartmentType;
  roomsNumber!: number;
  guestsNumber!: number;
  price!: number;
  goods!: Good[];
  hostId!: string;
  latitude!: number;
  longitude!: number;
}
