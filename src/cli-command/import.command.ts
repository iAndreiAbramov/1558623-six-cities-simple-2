import { ICLICommand } from '../types/command.types.js';
import TsvFileReader from '../common/file-reader/tsv-file-reader.js';

class ImportCommand implements ICLICommand {
  readonly name = '--import';

  public execute(filename: string) {
    const fileReader = new TsvFileReader(filename?.trim());
    fileReader.read();
    console.log(fileReader.toArray());
  }
}

export const importCommand = new ImportCommand();
