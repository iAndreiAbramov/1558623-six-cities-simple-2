import { IGoodService } from './good.types';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.types';
import { ILoggerService } from '../../common/logger/logger.types';
import CreateGoodDto from './dto/create-good.dto';
import { types } from '@typegoose/typegoose';
import { GoodEntity } from './good.entity';
import { Good } from '../../types/good.types';

@injectable()
export default class GoodService implements IGoodService {
  constructor(
    @inject(Component.ILoggerService) private readonly logger: ILoggerService,
    @inject(Component.GoodModel)
    private readonly goodModel: types.ModelType<GoodEntity>,
  ) {}

  async create(dto: CreateGoodDto): Promise<types.DocumentType<GoodEntity>> {
    const newGood = this.goodModel.create(dto);
    this.logger.info(`New good with name ${dto.name} was created`);
    return newGood;
  }

  async findByName(name: Good): Promise<types.DocumentType<GoodEntity> | null> {
    return this.goodModel.findOne({ name });
  }

  async findByNameOrCreate(
    dto: CreateGoodDto,
    name: Good,
  ): Promise<types.DocumentType<GoodEntity>> {
    const existingGood = await this.findByName(name);
    return existingGood ? existingGood : this.create(dto);
  }
}
