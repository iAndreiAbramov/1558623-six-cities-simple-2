import { DocumentType } from '@typegoose/typegoose';
import { CityEntity } from './city.entity';
import CreateCityDto from './dto/create-city.dto';
import { CityName } from '../../types/cities.types';

export interface ICityService {
  create: (dto: CreateCityDto) => Promise<DocumentType<CityEntity>>;
  findByName: (name: string) => Promise<DocumentType<CityEntity> | null>;
  findByNameOrCreate: (
    dto: CreateCityDto,
    name: CityName,
  ) => Promise<DocumentType<CityEntity>>;
}
