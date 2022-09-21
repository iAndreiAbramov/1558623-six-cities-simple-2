import * as mongoose from 'mongoose';
import { IDBClient } from './db-client.types';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.types';
import { ILoggerService } from '../logger/logger.types';

@injectable()
export class DBService implements IDBClient {
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
