import { DocumentType } from '@typegoose/typegoose';
import { CityEntity } from './city.entity';
import CreateCityDto from './dto/create-city.dto';
import { IDocumentExists } from '../../types/document-exists.interface';

export interface ICityService extends IDocumentExists {
  create: (dto: CreateCityDto) => Promise<DocumentType<CityEntity>>;
  findByName: (name: string) => Promise<DocumentType<CityEntity> | null>;
  getIdByName: (name: string) => Promise<string | null>;
  findByNameOrCreate: (dto: CreateCityDto) => Promise<DocumentType<CityEntity>>;
}
