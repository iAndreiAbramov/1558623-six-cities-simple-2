import { IFileReader } from '../../types/command.types';
import EventEmitter from 'events';
import { createReadStream } from 'fs';

export default class TsvFileReader extends EventEmitter implements IFileReader {
  constructor(public filename: string) {
    super();
  }

  async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      encoding: 'utf-8',
      highWaterMark: 16384,
    });

    let lineRead = '';
    let endLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      lineRead += chunk.toString();

      while ((endLinePosition = lineRead.indexOf('\n')) !== -1) {
        const completeRow = lineRead.slice(0, endLinePosition + 1);
        lineRead = lineRead.slice(endLinePosition + 1);
        importedRowCount++;

        await new Promise((resolve) => {
          this.emit('line', completeRow, resolve);
        });
      }
    }

    this.emit('end', importedRowCount);
  }
}
