import {
  IsDefined,
  IsMongoId,
  IsNumber,
  Length,
  Max,
  Min,
} from 'class-validator';

export default class CreateCommentDto {
  @IsDefined({ message: '$property should be defined' })
  @IsMongoId({ message: '$property should be a valid mongo Id' })
  offerId!: string;

  @IsDefined({ message: '$property should be defined' })
  @IsMongoId({ message: '$property should be a valid mongo Id' })
  authorId!: string;

  @IsDefined({ message: '$property should be defined' })
  @Length(5, 1024, {
    message:
      '$property length should be from $constraint1 to constraint2 characters',
  })
  text!: string;

  @IsDefined({ message: '$property should be defined' })
  @IsNumber()
  @Min(1, {
    message: '$property min value should be $constraint1',
  })
  @Max(5, {
    message: '$property max value should be $constraint1',
  })
  rating!: number;
}
