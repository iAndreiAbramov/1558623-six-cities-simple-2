import { IUser } from './user.types';
import { ICity } from './cities.types';
import { ApartmentType } from './apartment.types';
import { Good } from './good.types';

export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export interface IOfferFront {
  title: string;
  description: string;
  dateOfCreation: string;
  city: ICity;
  previewImage: string;
  photos: string[];
  isPremium: boolean;
  rating: number;
  type: ApartmentType;
  roomsNumber: number;
  guestsNumber: number;
  price: number;
  goods: Good[];
  host: IUser;
  coordinates: ICoordinates;
}

export interface IOfferParsed {
  title: string;
  description: string;
  dateOfCreation: string;
  city: string;
  previewImage: string;
  photos: string[];
  isPremium: string;
  rating: string;
  type: string;
  roomsNumber: string;
  guestsNumber: string;
  price: string;
  goods: string[];
  host: Record<string | number | symbol, string>;
  coordinates: string[];
}
