import * as mongoose from 'mongoose';
import { IDbClient } from './db-client.types';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.types.js';
import { ILoggerService } from '../logger/logger.types.js';

@injectable()
export default class DbClientService implements IDbClient {
  constructor(
    @inject(Component.ILoggerService) private logger: ILoggerService,
  ) {}

  async connect(uri: string) {
    this.logger.info('Connecting to database...');
    await mongoose.connect(uri);
    this.logger.info('Database connected');
  }

  async disconnect() {
    await mongoose.disconnect();
    this.logger.info('Database disconnected');
  }
}
