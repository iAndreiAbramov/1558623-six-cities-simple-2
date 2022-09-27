import { DocumentType } from '@typegoose/typegoose';
import { Good } from '../../types/good.types';
import CreateGoodDto from './dto/create-good.dto';
import { GoodEntity } from './good.entity';

export interface IGood {
  name: Good;
}

export interface IGoodService {
  create: (dto: CreateGoodDto) => Promise<DocumentType<GoodEntity>>;
  findByName: (name: Good) => Promise<DocumentType<GoodEntity> | null>;
  findByNameOrCreate: (
    dto: CreateGoodDto,
    name: Good,
  ) => Promise<DocumentType<GoodEntity>>;
}
