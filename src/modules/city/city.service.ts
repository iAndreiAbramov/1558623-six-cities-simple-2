import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { ICityService } from './city.types';
import { CityEntity } from './city.entity';
import { Component } from '../../types/component.types.js';
import CreateCityDto from './dto/create-city.dto';
import { ILoggerService } from '../../common/logger/logger.types';

@injectable()
export default class CityService implements ICityService {
  constructor(
    @inject(Component.ILoggerService) private readonly logger: ILoggerService,
    @inject(Component.CityModel)
    private readonly cityModel: types.ModelType<CityEntity>,
  ) {}

  async create(dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const newCity = await this.cityModel.create(dto);
    this.logger.info(`New city with name ${dto.name} created`);
    return newCity;
  }

  async findByName(name: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findOne({ name });
  }

  async getIdByName(name: string): Promise<string | null> {
    return this.cityModel.findOne({ name }).then((city) => city?.id);
  }

  async findByNameOrCreate(
    dto: CreateCityDto,
  ): Promise<DocumentType<CityEntity>> {
    const existingCity = await this.findByName(dto.name);
    return existingCity ? existingCity : this.create(dto);
  }

  async exists(documentId: string): Promise<boolean> {
    const existingEntity = await this.cityModel.findById(documentId);
    return !!existingEntity;
  }
}
