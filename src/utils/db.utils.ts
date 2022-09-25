export const getDbConnectionURI = ({
  dbUser,
  dbPassword,
  dbHost,
  dbPort,
  dbName,
}: {
  dbUser: string;
  dbPassword: string;
  dbHost: string;
  dbPort: number;
  dbName: string;
}): string => `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=admin`;
