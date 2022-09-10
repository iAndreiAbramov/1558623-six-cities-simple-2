import { ICLICommand } from '../types/command.types';
import { readFile } from 'fs/promises';

class VersionCommand implements ICLICommand {
  readonly name = '--version';

  async execute(): Promise<void> {
    const version = await this.readVersion();
    console.log(version);
  }

  private async readVersion(): Promise<string> {
    const fileContentJSON = (await readFile('./package.json', 'utf-8')
      .then((res) => JSON.parse(res))
      .catch(() => {
        throw new Error('failed to read ./package.json');
      })) as { version?: string };

    return fileContentJSON?.version || 'version is not specified';
  }
}

export const versionCommand = new VersionCommand();
