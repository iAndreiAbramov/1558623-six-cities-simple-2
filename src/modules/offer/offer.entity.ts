import typegoose, {
  defaultClasses,
  getModelForClass,
  Ref,
} from '@typegoose/typegoose';
import { CityEntity } from '../city/city.entity.js';
import { ApartmentType } from '../../types/apartment.types.js';
import { Good } from '../../types/good.types.js';
import { IOffer } from './offer.types';
import { UserEntity } from '../user/user.entity.js';

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
  cityId!: Ref<CityEntity>;

  @prop({ required: true })
  previewImage!: string;

  @prop({ required: true, type: String })
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

  @prop({ required: true, enum: Good, type: String })
  goods!: Good[];

  @prop({ required: true, ref: UserEntity, _id: false })
  hostId!: Ref<UserEntity>;

  @prop({ required: true, type: Number })
  coordinates!: number[];
}

export const OfferModel = getModelForClass(OfferEntity);
