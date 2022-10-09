import { ICLICommand } from '../types/command.types.js';
import TsvFileReader from '../common/file-reader/tsv-file-reader.js';
import { createOffer } from '../common/file-reader/tsv-file-reader.utils.js';
import { getErrorMessage } from '../utils/common.utils.js';
import { ILoggerService } from '../common/logger/logger.types';
import LoggerService from '../common/logger/logger.service.js';
import { IDbClient } from '../common/db-client/db-client.types';
import { getDbConnectionURI } from '../utils/db.utils.js';
import { IUserService } from '../modules/user/user.types';
import { IOfferParsed } from '../types/offer.types';
import UserService from '../modules/user/user.service.js';
import { UserModel } from '../modules/user/user.entity.js';
import { ICityService } from '../modules/city/city.types';
import { IOfferService } from '../modules/offer/offer.types';
import CityService from '../modules/city/city.service.js';
import { CityModel } from '../modules/city/city.entity.js';
import OfferService from '../modules/offer/offer.service.js';
import { OfferModel } from '../modules/offer/offer.entity.js';
import DbClientService from '../common/db-client/db-client.service.js';

const DEFAULT_USER_PASSWORD = '123456';

class ImportCommand implements ICLICommand {
  readonly name = '--import';
  private readonly loggerService: ILoggerService;
  private readonly userService: IUserService;
  private readonly cityService: ICityService;
  private readonly offerService: IOfferService;
  private readonly databaseService: IDbClient;
  private salt!: string;

  constructor() {
    this.onLineReady = this.onLineReady.bind(this);
    this.onEnd = this.onEnd.bind(this);

    this.loggerService = new LoggerService();
    this.userService = new UserService(this.loggerService, UserModel);
    this.databaseService = new DbClientService(this.loggerService);
    this.cityService = new CityService(this.loggerService, CityModel);
    this.offerService = new OfferService(this.loggerService, OfferModel);
  }

  private async saveOffer(offer: IOfferParsed): Promise<void> {
    const city = await this.cityService.findByNameOrCreate(offer.city);

    const user = await this.userService.findOrCreate(
      {
        ...offer.host,
        password: DEFAULT_USER_PASSWORD,
      },
      this.salt,
    );

    await this.offerService.create({
      ...offer,
      cityId: city.id,
      cityName: city.name,
      hostId: user.id,
    });
  }

  private async onLineReady(line: string, resolve: () => void): Promise<void> {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private readonly onEnd = async (count: number) => {
    console.log(`${count} offers imported`);
    await this.databaseService.disconnect();
  };

  async execute(
    filename: string,
    dbUser: string,
    dbPassword: string,
    dbHost: string,
    dbPort: string,
    dbName: string,
    salt: string,
  ): Promise<void> {
    const uri = getDbConnectionURI({
      dbUser,
      dbPassword,
      dbHost,
      dbPort,
      dbName,
    });
    this.salt = salt;

    await this.databaseService.connect(uri);

    const fileReader = new TsvFileReader(filename?.trim());
    fileReader.on('line', this.onLineReady);
    fileReader.on('end', this.onEnd);

    await fileReader.read().catch((err) => {
      console.log(`Failed to read file ${filename}: ${getErrorMessage(err)}`);
      this.onEnd(0);
    });
  }
}

export const importCommand = new ImportCommand();
