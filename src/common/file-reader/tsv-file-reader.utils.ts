import { IOfferParsed } from '../../types/offer.types';
import {
  COORDINATES_NUMBER,
  PHOTOS_NUMBER_IN_OFFER,
} from '../../constants/common.constants.js';

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
  return {
    title,
    description,
    dateOfCreation,
    city,
    previewImage,
    photos: photos?.split(';', PHOTOS_NUMBER_IN_OFFER),
    isPremium,
    rating,
    type,
    roomsNumber,
    guestsNumber,
    price,
    goods: goods?.split(';'),
    host: {
      name: host?.split(';')[0],
      email: host?.split(';')[1],
      avatar: host?.split(';')[2],
      password: host?.split(';')[3],
      isPro: host?.split(';')[4],
    },
    coordinates: coordinates?.split(';', COORDINATES_NUMBER),
  };
};
