import {
  IsDefined,
  IsMongoId,
  IsNumber,
  Length,
  Max,
  Min,
} from 'class-validator';
import {
  MAX_COMMENT_LENGTH,
  MAX_RATING,
  MIN_COMMENT_LENGTH,
  MIN_RATING,
} from '../../../constants/common.constants.js';

export default class CreateCommentDto {
  @IsDefined({ message: '$property should be defined' })
  @IsMongoId({ message: '$property should be a valid mongo Id' })
  offerId!: string;

  @IsDefined({ message: '$property should be defined' })
  @Length(MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH, {
    message:
      '$property length should be from $constraint1 to constraint2 characters',
  })
  text!: string;

  @IsDefined({ message: '$property should be defined' })
  @IsNumber()
  @Min(MIN_RATING, {
    message: '$property min value should be $constraint1',
  })
  @Max(MAX_RATING, {
    message: '$property max value should be $constraint1',
  })
  rating!: number;

  userId!: string;
}
