import { ICLICommand } from '../types/command.types';
import { IMockData } from '../types/mock-data.types';
import got from 'got';
import { OfferGenerator } from '../common/offer-generator/offer-generator.js';
import { appendFile } from 'fs/promises';

class GenerateCommand implements ICLICommand {
  readonly name = '--generate';
  private initialData: IMockData = {
    titles: [''],
    descriptions: [''],
    cityNames: [''],
    previewImages: [''],
    photos: [''],
    isPremium: '',
    apartmentTypes: [''],
    goods: [''],
    users: [''],
    coordinates: [''],
  };

  async execute(...params: string[]): Promise<void> {
    const [count, filepath, url] = params;
    const offerCount = Number(count);
    try {
      this.initialData = await got.get(url).json();
    } catch {
      console.log(`Failed to get data from ${url}`);
    }

    const offerStringGenerator = new OfferGenerator(this.initialData);

    for (let i = 0; i < offerCount; i++) {
      await appendFile(
        filepath,
        `${offerStringGenerator.generate()}\n`,
        'utf-8',
      );
    }
    console.log(`File ${filepath} was created`);
  }
}

export const generateCommand = new GenerateCommand();
