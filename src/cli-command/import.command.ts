import { ICLICommand } from '../types/command.types.js';
import TsvFileReader from '../common/file-reader/tsv-file-reader.js';

class ImportCommand implements ICLICommand {
  readonly name = '--import';

  public execute(filename: string) {
    const fileReader = new TsvFileReader(filename.trim());
    try {
      void fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      console.log(`Failed to import data: ${err.message}`);
    }
  }
}

export const importCommand = new ImportCommand();
