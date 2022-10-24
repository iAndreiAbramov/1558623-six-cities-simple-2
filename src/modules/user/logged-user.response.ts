import { Expose } from 'class-transformer';

export default class LoggedUserResponse {
  @Expose()
  token!: string;

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  avatar!: string;

  @Expose()
  isPro!: boolean;
}
