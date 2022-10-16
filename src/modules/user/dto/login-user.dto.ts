import { IsDefined, IsString, Length, Matches } from 'class-validator';

export class LoginUserDto {
  @IsDefined({ message: '$property should be defined' })
  @IsString({ message: '$property should be a string' })
  @Matches(/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, {
    message: '$property should be a valid email',
  })
  email!: string;

  @IsDefined({ message: '$property should be defined' })
  @IsString({ message: '$property should be a string' })
  @Length(6, 12, {
    message:
      '$property length should be from $constraint1 to $constraint2 characters',
  })
  password!: string;
}
