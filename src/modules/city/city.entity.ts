import mongoose, {
  defaultClasses,
  getModelForClass,
} from '@typegoose/typegoose';
import { CityName, ICity } from '../../types/cities.types';

const { modelOptions, prop } = mongoose;

export interface CityEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'cities',
  },
})
export class CityEntity extends defaultClasses.TimeStamps implements ICity {
  @prop({ enum: CityName })
  name!: CityName;

  @prop()
  latitude!: number;

  @prop()
  longitude!: number;
}

export const CityModel = getModelForClass(CityEntity);
