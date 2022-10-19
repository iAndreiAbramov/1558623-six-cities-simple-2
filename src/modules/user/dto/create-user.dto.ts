import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsString,
  Length,
} from 'class-validator';

export default class CreateUserDto {
  @IsDefined({ message: '$property should be defined' })
  @IsString({ message: '$property should be a string' })
  @Length(1, 15, {
    message:
      '$property length should be from $constraint1 to $constraint2 characters',
  })
  name!: string;

  @IsDefined({ message: '$property should be defined' })
  @IsEmail({ message: '$property should be a valid email' })
  email!: string;

  @IsString({ message: '$property should be a string' })
  avatar!: string;

  @IsDefined({ message: '$property should be defined' })
  @IsString({ message: '$property should be a string' })
  @Length(6, 12, {
    message:
      '$property length should be from $constraint1 to $constraint2 characters',
  })
  password!: string;

  @IsDefined({ message: '$property should be defined' })
  @IsBoolean({ message: '$property should be a boolean data type' })
  isPro!: boolean;
}
