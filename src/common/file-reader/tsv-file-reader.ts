import { IFileReader } from '../../types/command.types';
import { readFile } from 'fs/promises';
import { IOfferParsed } from '../../types/offer.types';
import { COORDINATES_NUMBER, PHOTOS_NUMBER_IN_OFFER } from '../../constants/common.constants.js';

export default class TsvFileReader implements IFileReader {
  private rawData = '';

  constructor (public filename: string) {}

  async read(): Promise<void> {
    this.rawData = await readFile(this.filename, 'utf-8')
      .catch(() => {
        throw new Error(`failed to read ${this.filename}`);
      });
  }

  toArray(): IOfferParsed[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([
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
        coordinates
      ]) => ({
        title,
        description,
        dateOfCreation,
        city,
        previewImage,
        photos: photos.split(';', PHOTOS_NUMBER_IN_OFFER),
        isPremium,
        rating,
        type,
        roomsNumber,
        guestsNumber,
        price,
        goods: goods.split(';'),
        host,
        coordinates: coordinates.split(';', COORDINATES_NUMBER),
      })
      );
  }
}
