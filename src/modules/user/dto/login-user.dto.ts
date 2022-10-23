import { IsDefined, IsEmail, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsDefined({ message: '$property should be defined' })
  @IsEmail()
  email!: string;

  @IsDefined({ message: '$property should be defined' })
  @IsString({ message: '$property should be a string' })
  @Length(6, 12, {
    message:
      '$property length should be from $constraint1 to $constraint2 characters',
  })
  password!: string;
}
