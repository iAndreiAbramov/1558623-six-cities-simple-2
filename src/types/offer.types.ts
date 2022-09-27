import { IUser } from './user.types';
import { ICity } from './cities.types';

export enum Good {
  Breakfast = 'Breakfast',
  AirConditioning = 'Air conditioning',
  LaptopFriendlyWorkspace = 'Laptop friendly workspace',
  BabySeat = 'Baby seat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge',
}

export enum ApartmentType {
  Apartment = 'apartment',
  House = 'house',
  Room = 'room',
  Hotel = 'hotel',
}

export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export interface IOffer {
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
