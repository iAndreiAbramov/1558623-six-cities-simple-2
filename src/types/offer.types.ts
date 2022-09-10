import { IUser } from './user.types';

export enum Good {
  Breakfast = 'Breakfast',
  AirConditioning = 'Air conditioning',
  LaptopFriendlyWorkspace = 'Laptop friendly workspace',
  BabySeat = 'Baby seat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge',
}

export enum CityName {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
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

export type ICity = {
  [name in CityName]: ICoordinates;
};

export interface IOffer {
  title: string;
  description: string;
  dateOfCreation: Date;
  city: ICity;
  previewImage: string;
  photos: [string, string, string, string, string, string];
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
  host: string;
  coordinates: string[];
}
