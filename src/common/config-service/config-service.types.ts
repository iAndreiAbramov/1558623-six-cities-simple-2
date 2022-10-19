export type TConfigSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: string;
  DB_NAME: string;
  UPLOAD_DIRECTORY: string;
};

export interface IConfigService {
  get: <T extends keyof TConfigSchema>(key: T) => TConfigSchema[T];
}
