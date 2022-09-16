import { IUser } from './user.types';

export interface IComment {
  commentText: string;
  creationDate?: Date;
  rating: number;
  author: IUser;
}
