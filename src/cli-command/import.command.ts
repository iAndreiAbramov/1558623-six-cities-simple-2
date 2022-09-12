import { ICLICommand } from '../types/command.types.js';
import TsvFileReader from '../common/file-reader/tsv-file-reader.js';
import { createOffer } from '../common/file-reader/tsv-file-reader.utils.js';
import { getErrorMessage } from '../utils/common.utils.js';

class ImportCommand implements ICLICommand {
  readonly name = '--import';

  private onLineReady(line: string): void {
    const offer = createOffer(line);
    console.log(offer);
  }

  private onEnd = (count: number) => {
    console.log(`${count} offers created`);
  };

  async execute(filename: string): Promise<void> {
    const fileReader = new TsvFileReader(filename?.trim());
    fileReader.on('line', this.onLineReady);
    fileReader.on('end', this.onEnd);

    await fileReader.read().catch((err) => {
      console.log(`Failed to read file ${filename}: ${getErrorMessage(err)}`);
    });
  }
}

export const importCommand = new ImportCommand();
