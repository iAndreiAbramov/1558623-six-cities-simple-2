import { IFileWriter } from './file-writer.types';
import { createWriteStream, WriteStream } from 'fs';

export default class FileWriter implements IFileWriter {
  private writeStream: WriteStream;

  constructor(readonly filename: string) {
    this.writeStream = createWriteStream(this.filename, {
      flags: 'w',
      encoding: 'utf-8',
      highWaterMark: 4 ** 16,
      autoClose: true,
    });
  }

  public async write(row: string): Promise<void> {
    if (!this.writeStream.write(`${row}\n`)) {
      return new Promise((resolve) => {
        this.writeStream.once('drain', () => resolve);
      });
    }
    return Promise.resolve();
  }
}
