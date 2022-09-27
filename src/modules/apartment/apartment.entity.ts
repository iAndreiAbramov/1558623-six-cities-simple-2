import mongoose, {
  defaultClasses,
  getModelForClass,
} from '@typegoose/typegoose';
import { IApartment } from './apartment.types';
import { ApartmentType } from '../../types/apartment.types';

const { modelOptions, prop } = mongoose;

export interface ApartmentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'apartment_type',
  },
})
export class ApartmentEntity
  extends defaultClasses.TimeStamps
  implements IApartment
{
  @prop({ required: true })
  name!: ApartmentType;
}

export const ApartmentModel = getModelForClass(ApartmentEntity);
