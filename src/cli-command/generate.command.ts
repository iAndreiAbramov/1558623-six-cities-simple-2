import { ICLICommand } from '../types/command.types';
import { IMockData } from '../types/mock-data.types';
import got from 'got';
import { OfferGenerator } from '../common/offer-generator/offer-generator.js';
import FileWriter from '../common/file-writer/file-writer.js';

class GenerateCommand implements ICLICommand {
  readonly name = '--generate';
  private initialData: IMockData | null = null;
  private hasFetchError = false;

  async execute(...params: string[]): Promise<void> {
    const [count, filepath, url] = params;
    const offersCount = Number(count);
    try {
      this.initialData = await got.get(url).json();
      this.hasFetchError = false;
    } catch {
      this.hasFetchError = true;
      console.log(`Failed to get data from ${url}`);
    }

    const offerStringGenerator = new OfferGenerator(this.initialData);
    const fileWriter = new FileWriter(filepath);

    if (!this.hasFetchError) {
      for (let i = 0; i < offersCount; i++) {
        await fileWriter.write(offerStringGenerator.generate());
      }
      console.log(`File ${filepath} was created`);
    }
  }
}

export const generateCommand = new GenerateCommand();
