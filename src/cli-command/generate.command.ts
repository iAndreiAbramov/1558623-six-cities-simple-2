import { ICLICommand } from '../types/command.types';
import { IMockData } from '../types/mock-data.types';

export class GenerateCommand implements ICLICommand {
  readonly name = '--generate';
  private initialData: IMockData;

  execute(...params: string[]): void {
    const [count, filepath, url] = params;
    const offerCount = Number(count);
    console.log(count, filepath, url);
  }
}
