import mongoose, {
  defaultClasses,
  getModelForClass,
} from '@typegoose/typegoose';
import { CityName, ICity } from '../../types/cities.types.js';

const { modelOptions, prop } = mongoose;

export interface CityEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'Cities',
  },
})
export class CityEntity extends defaultClasses.TimeStamps implements ICity {
  @prop({ enum: CityName, required: true, unique: true })
  name!: CityName;

  @prop({ required: true })
  latitude!: number;

  @prop({ required: true })
  longitude!: number;
}

export const CityModel = getModelForClass(CityEntity);
