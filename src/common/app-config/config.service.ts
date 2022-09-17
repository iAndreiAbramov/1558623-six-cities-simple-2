import { config } from 'dotenv';
import { inject, injectable } from 'inversify';
import { IConfigService, TConfigSchema } from './app-config.types.js';
import { ILoggerService } from '../logger/logger.types.js';
import { appConfigSchema } from './app-config.schema.js';
import { Component } from '../../types/component.types.js';

@injectable()
export class ConfigService implements IConfigService {
  private readonly config: TConfigSchema;
  private logger: ILoggerService;

  constructor(@inject(Component.ILoggerService) providedLogger: ILoggerService) {
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
