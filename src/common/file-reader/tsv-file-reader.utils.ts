import { IOfferParsed } from '../../types/offer.types';
import {
  COORDINATES_NUMBER,
  PHOTOS_NUMBER_IN_OFFER,
} from '../../constants/common.constants.js';
import { CityName } from '../../types/cities.types';
import { ApartmentType } from '../../types/apartment.types';
import { Good } from '../../types/good.types';

export const createOffer = (row: string): IOfferParsed => {
  const tokens = row.replace('\n', '').split('\t');
  const [
    title,
    description,
    dateOfCreation,
    city,
    previewImage,
    photos,
    isPremium,
    rating,
    type,
    roomsNumber,
    guestsNumber,
    price,
    goods,
    host,
    coordinates,
  ] = tokens;
  const [name, latitude, longitude] = city.split(';');
  const [hostName, hostEmail, hostAvatar, isHostPro] = host.split(';');
  return {
    title,
    description,
    dateOfCreation,
    city: {
      name: name as CityName,
      latitude: Number(latitude) || 0,
      longitude: Number(longitude) || 0,
    },
    previewImage,
    photos: photos?.split(';', PHOTOS_NUMBER_IN_OFFER),
    isPremium: isPremium === 'true' || false,
    rating: Number(rating) || 0,
    type: type as ApartmentType,
    roomsNumber: Number(roomsNumber) || 0,
    guestsNumber: Number(guestsNumber) || 0,
    price: Number(price) || 0,
    goods: goods?.split(';') as Good[],
    host: {
      name: hostName || '',
      email: hostEmail || '',
      avatar: hostAvatar || '',
      isPro: isHostPro === 'true' || false,
    },
    coordinates: coordinates
      ?.split(';', COORDINATES_NUMBER)
      .map((item) => Number(item) || 0),
  };
};
