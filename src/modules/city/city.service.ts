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
  constructor(
    @inject(Component.CityModel)
    private readonly cityModel: types.ModelType<CityEntity>,
    @inject(Component.ILoggerService) private readonly logger: ILoggerService,
  ) {}

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
