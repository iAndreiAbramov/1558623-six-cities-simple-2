import { Expose } from 'class-transformer';

export default class LoggedUserResponse {
  @Expose()
  token!: string;

  @Expose()
  email!: string;
}
