import { IUser } from './user.types';
import { ICoordinates } from './offer.types';

export interface IMockData {
  titles: string[];
  descriptions: string[];
  cityNames: string[];
  previewImages: string[];
  photos: string[];
  isPremium: boolean;
  apartmentTypes: string[];
  goods: string[];
  users: IUser[];
  coordinates: ICoordinates[];
}
