export const Component = {
  Application: Symbol.for('Application'),
  IConfigService: Symbol.for('ConfigService'),
  IDbClient: Symbol.for('DbClient'),
  ILoggerService: Symbol.for('Logger'),
  IUserService: Symbol.for('UserService'),
  UserModel: Symbol.for('UserModel'),
  CityModel: Symbol.for('CityModel'),
  ICityService: Symbol.for('CityService'),
  GoodModel: Symbol.for('GoodModel'),
  IGoodService: Symbol.for('GoodService'),
  ApartmentModel: Symbol.for('ApartmentModel'),
  IApartmentService: Symbol.for('ApartmentService'),
} as const;
