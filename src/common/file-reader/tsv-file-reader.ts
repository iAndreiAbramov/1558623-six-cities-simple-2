import { IFileReader } from '../../types/command.types';
import { IOfferParsed } from '../../types/offer.types';
import {
  COORDINATES_NUMBER,
  PHOTOS_NUMBER_IN_OFFER,
} from '../../constants/common.constants.js';
import { readFileSync } from 'fs';

export default class TsvFileReader implements IFileReader {
  private rawData = '';

  constructor(public filename: string) {}

  read(): void {
    this.rawData = readFileSync(this.filename, 'utf-8');
  }

  toArray(): IOfferParsed[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(
        ([
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
        ]) => ({
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
            name: host.split(';')[0],
            email: host.split(';')[1],
            avatar: host.split(';')[2],
            password: host.split(';')[3],
            isPro: host.split(';')[4],
          },
          coordinates: coordinates?.split(';', COORDINATES_NUMBER),
        }),
      );
  }
}
