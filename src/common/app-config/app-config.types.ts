export type TConfigSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
};

export interface IConfigService {
  get: <T extends keyof TConfigSchema>(key: T) => TConfigSchema[T];
}
