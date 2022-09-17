export type TConfigSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
};

export interface IAppConfig {
  get: <T extends keyof TConfigSchema>(key: T) => TConfigSchema[T];
}
