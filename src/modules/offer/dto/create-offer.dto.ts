import { ApartmentType } from '../../../types/apartment.types.js';
import { Good } from '../../../types/good.types.js';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { CityName } from '../../../types/cities.types.js';
import {
  MAX_GUESTS,
  MAX_PRICE,
  MAX_ROOMS_NUMBER,
  MIN_GUESTS,
  MIN_PRICE,
  MIN_ROOMS_NUMBER,
} from '../../../constants/common.constants.js';

export default class CreateOfferDto {
  @IsDefined({ message: '$property should be defined' })
  @IsString({ message: '$property should be a string' })
  @Length(10, 100, {
    message:
      '$property length should be from $constraint1 to $constraint2 characters',
  })
  title!: string;

  @IsDefined({ message: '$property should be defined' })
  @IsString({ message: '$property should be a string' })
  @Length(20, 1024, {
    message:
      '$property length should be from $constraint1 to constraint2 characters',
  })
  description!: string;

  @IsString({ message: '$property should be a string' })
  @IsEnum(CityName, { message: '$value is not valid $property' })
  cityName!: CityName;

  @IsDefined({ message: '$property should be defined' })
  @IsString({ message: '$property should be a string' })
  previewImage!: string;

  @IsArray()
  @IsDefined({ message: '$property should be defined' })
  @ArrayMinSize(6, {
    message: '$property should be an array of $constraint1 elements',
  })
  @ArrayMaxSize(6, {
    message: '$property should be an array of $constraint1 elements',
  })
  @IsString({ message: '$property should be a string', each: true })
  photos!: string[];

  @IsDefined({ message: '$property should be defined' })
  @IsBoolean({ message: '$property should be a boolean data type' })
  isPremium!: boolean;

  @IsDefined({ message: '$property should be defined' })
  @IsEnum(ApartmentType, { message: '$value is not valid $property' })
  type!: ApartmentType;

  @IsDefined({ message: '$property should be defined' })
  @Min(MIN_ROOMS_NUMBER, {
    message: '$property min value should be $constraint1',
  })
  @Max(MAX_ROOMS_NUMBER, {
    message: '$property max value should be $constraint1',
  })
  roomsNumber!: number;

  @IsNumber()
  @IsDefined({ message: '$property should be defined' })
  @Min(MIN_GUESTS, {
    message: '$property min value should be $constraint1',
  })
  @Max(MAX_GUESTS, {
    message: '$property max value should be $constraint1',
  })
  guestsNumber!: number;

  @IsNumber()
  @Min(MIN_PRICE, {
    message: '$property min value should be $constraint1',
  })
  @Max(MAX_PRICE, {
    message: '$property max value should be $constraint1',
  })
  price!: number;

  @IsArray()
  @IsDefined({ message: '$property should be defined' })
  @ArrayNotEmpty({
    message: '$property should not be an empty array',
  })
  @IsDefined({ message: '$property should be defined', each: true })
  @IsEnum(Good, { message: '$value is not valid $property', each: true })
  goods!: Good[];

  @IsArray()
  @IsDefined({ message: '$property should be defined' })
  @ArrayMinSize(2, {
    message: '$property should be an array of $constraint1 elements',
  })
  @ArrayMaxSize(2, {
    message: '$property should be an array of $constraint1 elements',
  })
  @IsNumber()
  coordinates?: number[];

  @IsMongoId({ message: '$property should be a valid mongo Id' })
  hostId!: string;

  cityId?: string;
}
