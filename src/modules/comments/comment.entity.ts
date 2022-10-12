import typegoose, {
  defaultClasses,
  Ref,
} from '@typegoose/typegoose';
import { IComment } from './comment.types';
import { UserEntity } from '../user/user.entity.js';
import { OfferEntity } from '../offer/offer.entity.js';

const { getModelForClass, modelOptions, prop } = typegoose;

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments',
  },
})
export class CommentEntity
  extends defaultClasses.TimeStamps
  implements IComment
{
  @prop({
    required: true,
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 1024,
  })
  text!: string;

  @prop({ required: true, type: Number, min: 1, max: 5 })
  rating!: number;

  @prop({ required: true, ref: UserEntity, _id: false })
  author!: Ref<UserEntity>;

  @prop({ required: true, ref: OfferEntity, _id: false })
  offerId!: Ref<OfferEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
