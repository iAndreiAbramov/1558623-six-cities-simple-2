import convict from 'convict';
import validator from 'convict-format-with-validator';
import { TConfigSchema } from './app-config.types';

convict.addFormats(validator);

export const appConfigSchema = convict<TConfigSchema>({
  PORT: {
    doc: 'Port for incoming connection',
    format: 'port',
    env: 'PORT',
    default: 4000,
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null,
  },
  DB_HOST: {
    doc: 'IP address for database server (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1',
  }
});
