import typegoose, {
  defaultClasses,
  getModelForClass,
  Ref,
} from '@typegoose/typegoose';
import { CityEntity } from '../city/city.entity';
import { ApartmentType } from '../../types/apartment.types';
import { Good } from '../../types/good.types';
import { IOffer } from './offer.types';
import { UserEntity } from '../user/user.entity';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'Offers',
  },
})
export class OfferEntity extends defaultClasses.TimeStamps implements IOffer {
  @prop({ required: true })
  title!: string;

  @prop({ required: true })
  description!: string;

  @prop({ required: true, ref: CityEntity, _id: false })
  city!: Ref<CityEntity>;

  @prop({ required: true })
  previewImage!: string;

  @prop({ required: true })
  photos!: string[];

  @prop({ required: true })
  isPremium!: boolean;

  @prop({ required: true })
  rating!: number;

  @prop({ enum: ApartmentType })
  type!: ApartmentType;

  @prop({ required: true })
  roomsNumber!: number;

  @prop({ required: true })
  guestsNumber!: number;

  @prop({ required: true })
  price!: number;

  @prop({ required: true, enum: Good })
  goods!: Good[];

  @prop({ required: true, ref: UserEntity })
  host!: Ref<UserEntity>;

  @prop({ required: true, type: Number })
  coordinates!: number[];
}

export const OfferModel = getModelForClass(OfferEntity);
