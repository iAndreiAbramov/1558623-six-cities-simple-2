import { IOfferGenerator } from './offer-generator.types';
import { IMockData } from '../../types/mock-data.types';
import {
  getRandomArrayItem,
  getRandomArrayItems,
  getRandomBoolean,
  getRandomDate,
  getRandomFloat,
  getRandomInteger,
} from '../../utils/common.utils';
import {
  DECIMALS_IN_PRICE,
  DECIMALS_IN_RATING,
  MAX_GUESTS,
  MAX_PRICE,
  MAX_RATING,
  MAX_ROOMS_NUMBER,
  MIN_GOODS_NUMBER,
  MIN_GUESTS,
  MIN_PRICE,
  MIN_RATING,
  MIN_ROOMS_NUMBER,
  PHOTOS_NUMBER_IN_OFFER,
} from '../../constants/common.constants';

export class OfferGenerator implements IOfferGenerator {
  constructor(private mockData: IMockData) {}

  generate(): string {
    const {
      titles,
      descriptions,
      cityNames,
      previewImages,
      photos,
      apartmentTypes,
      goods,
      users,
      coordinates,
    } = this.mockData;

    const title = getRandomArrayItem(titles);
    const description = getRandomArrayItem(descriptions);
    const dateOfCreation = getRandomDate();
    const cityName = getRandomArrayItem(cityNames);
    const previewImage = getRandomArrayItem(previewImages);
    const randomPhotos = getRandomArrayItems(
      photos,
      PHOTOS_NUMBER_IN_OFFER,
    ).join(';');
    const isPremium = String(getRandomBoolean());
    const rating = String(
      getRandomFloat(MIN_RATING, MAX_RATING, DECIMALS_IN_RATING),
    );
    const type = String(getRandomArrayItem(apartmentTypes));
    const roomsNumber = String(
      getRandomInteger(MIN_ROOMS_NUMBER, MAX_ROOMS_NUMBER),
    );
    const guestsNumber = String(getRandomInteger(MIN_GUESTS, MAX_GUESTS));
    const price = String(
      getRandomFloat(MIN_PRICE, MAX_PRICE, DECIMALS_IN_PRICE),
    );
    const randomGoods = getRandomArrayItems(
      goods,
      getRandomInteger(MIN_GOODS_NUMBER, goods.length - 1),
    ).join(';');
    const host = getRandomArrayItem(users);
    const randomCoordinates = Object.values(
      getRandomArrayItem(coordinates),
    ).join(';');

    return [
      title,
      description,
      dateOfCreation,
      cityName,
      previewImage,
      randomPhotos,
      isPremium,
      rating,
      type,
      roomsNumber,
      guestsNumber,
      price,
      randomGoods,
      host,
      randomCoordinates,
    ].join('\t');
  }
}
