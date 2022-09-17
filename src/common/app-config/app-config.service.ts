import { config } from 'dotenv';
import { IAppConfig, TConfigSchema } from './app-config.types';
import { ILogger } from '../logger/logger.types';
import { appConfigSchema } from './app-config.schema.js';

export class AppConfigService implements IAppConfig {
  private readonly config: TConfigSchema;
  private logger: ILogger;

  constructor(providedLogger: ILogger) {
    this.logger = providedLogger;

    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error(
        'Failed to read .env file. Perhaps the file does not exists.',
      );
    }

    appConfigSchema.load({});
    appConfigSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = appConfigSchema.getProperties();
    console.log(this.config);

    this.logger.info('.env file successfully parsed!');
  }

  get<T extends keyof TConfigSchema>(key: T) {
    return this.config[key];
  }
}
