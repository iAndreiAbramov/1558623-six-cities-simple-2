import { inject, injectable } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/component.types';
import { ILoggerService } from '../../common/logger/logger.types';
import { ApartmentEntity } from './apartment.entity';
import { IApartmentService } from './apartment.types';
import CreateApartmentDto from './dto/create-apartment.dto';
import { ApartmentType } from '../../types/apartment.types';

@injectable()
export default class ApartmentService implements IApartmentService {
  constructor(
    @inject(Component.ILoggerService) private readonly logger: ILoggerService,
    @inject(Component.ApartmentModel)
    private readonly apartmentModel: types.ModelType<ApartmentEntity>,
  ) {}

  async create(
    dto: CreateApartmentDto,
  ): Promise<types.DocumentType<ApartmentEntity>> {
    const newApartmentType = await this.apartmentModel.create(dto);
    this.logger.info(`New apartment type ${dto.name} was created`);
    return newApartmentType;
  }

  async findByName(
    name: ApartmentType,
  ): Promise<types.DocumentType<ApartmentEntity> | null> {
    return this.apartmentModel.findOne({ name });
  }

  async findByNameOrCreate(
    dto: CreateApartmentDto,
    name: ApartmentType,
  ): Promise<types.DocumentType<ApartmentEntity>> {
    const existingType = await this.findByName(name);
    return existingType ? existingType : this.create(dto);
  }
}
