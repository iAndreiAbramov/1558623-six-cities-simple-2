import { DocumentType } from '@typegoose/typegoose';
import { ApartmentType } from '../../types/apartment.types';
import CreateApartmentDto from './dto/create-apartment.dto';
import { ApartmentEntity } from './apartment.entity';

export interface IApartment {
  name: ApartmentType;
}

export interface IApartmentService {
  create: (dto: CreateApartmentDto) => Promise<DocumentType<ApartmentEntity>>;
  findByName: (
    name: ApartmentType,
  ) => Promise<DocumentType<ApartmentEntity> | null>;
  findByNameOrCreate: (
    dto: CreateApartmentDto,
    name: ApartmentType,
  ) => Promise<DocumentType<ApartmentEntity>>;
}
