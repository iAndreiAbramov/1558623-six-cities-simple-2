import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsString,
  Length,
} from 'class-validator';
import {
  MAX_PASSWORD_LENGTH,
  MAX_USER_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USER_NAME_LENGTH,
} from '../../../constants/common.constants.js';

export default class CreateUserDto {
  @IsDefined({ message: '$property should be defined' })
  @IsString({ message: '$property should be a string' })
  @Length(MIN_USER_NAME_LENGTH, MAX_USER_NAME_LENGTH, {
    message:
      '$property length should be from $constraint1 to $constraint2 characters',
  })
  name!: string;

  @IsDefined({ message: '$property should be defined' })
  @IsEmail({ message: '$property should be a valid email' })
  email!: string;

  @IsString({ message: '$property should be a string' })
  avatar?: string;

  @IsDefined({ message: '$property should be defined' })
  @IsString({ message: '$property should be a string' })
  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, {
    message:
      '$property length should be from $constraint1 to $constraint2 characters',
  })
  password!: string;

  @IsDefined({ message: '$property should be defined' })
  @IsBoolean({ message: '$property should be a boolean data type' })
  isPro!: boolean;
}
