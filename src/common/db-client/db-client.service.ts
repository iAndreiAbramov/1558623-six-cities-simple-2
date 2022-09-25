import * as mongoose from 'mongoose';
import { IDbClient } from './db-client.types';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.types';
import { ILoggerService } from '../logger/logger.types';

@injectable()
export class DbClientService implements IDbClient {
  constructor(
    @inject(Component.ILoggerService) private logger: ILoggerService,
  ) {}

  async connect(uri: string) {
    try {
      this.logger.info('Connecting to database...');
      await mongoose.connect(uri);
      this.logger.info('Database connected');
    } catch {
      this.logger.error('Failed to connect to database');
    }
  }

  async disconnect() {
    await mongoose.disconnect();
    this.logger.info('Database disconnected');
  }
}
