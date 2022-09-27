import mongoose, {
  defaultClasses,
  getModelForClass,
} from '@typegoose/typegoose';
import { IGood } from './good.types';
import { Good } from '../../types/good.types';

export interface GoodEntity extends defaultClasses.Base {}

const { prop, modelOptions } = mongoose;

@modelOptions({
  schemaOptions: {
    collection: 'Goods',
  },
})
export class GoodEntity extends defaultClasses.TimeStamps implements IGood {
  @prop({ enum: Good })
  name!: Good;
}

export const GoodModel = getModelForClass(GoodEntity);
