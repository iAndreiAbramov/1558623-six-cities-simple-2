import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { ICityService } from './city-service.types';
import { CityEntity } from './city.entity';
import { Component } from '../../types/component.types';
import CreateCityDto from './dto/create-city.dto';
import { CityName } from '../../types/cities.types';
import { ILoggerService } from '../../common/logger/logger.types';

@injectable()
export default class CityService implements ICityService {
  private cityModel!: types.ModelType<CityEntity>;
  private logger!: ILoggerService;

  constructor(
    @inject(Component.CityModel) providedCityModel: types.ModelType<CityEntity>,
    @inject(Component.ILoggerService) providedLogger: ILoggerService,
  ) {
    this.cityModel = providedCityModel;
    this.logger = providedLogger;
  }

  async create(dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const newCity = await this.cityModel.create(dto);
    this.logger.info(`New city with name ${dto.name} created`);
    return newCity;
  }

  async findByName(name: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findOne({ name });
  }

  async findByNameOrCreate(
    dto: CreateCityDto,
    name: CityName,
  ): Promise<DocumentType<CityEntity> | null> {
    const existingCity = await this.findByName(name);
    return existingCity ? existingCity : this.create(dto);
  }
}
