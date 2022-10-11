import { Expose } from 'class-transformer';

export default class UserResponse {
  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  avatar!: string;

  @Expose()
  isPro!: boolean;
}
