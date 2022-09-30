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
  dbPort: string;
  dbName: string;
}): string => `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=admin`;
