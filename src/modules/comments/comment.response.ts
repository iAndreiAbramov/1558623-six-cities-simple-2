import { Expose, Type } from 'class-transformer';
import UserResponse from '../user/user.response.js';

export default class CommentResponse {
  @Expose()
  text!: string;

  @Expose()
  rating!: number;

  @Expose()
  @Type(() => UserResponse)
  author!: UserResponse;

  @Expose()
  createdAt!: string;
}
