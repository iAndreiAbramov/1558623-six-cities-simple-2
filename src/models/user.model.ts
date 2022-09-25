import mongoose from 'mongoose';
import { IUser } from '../types/user.types';

export interface IUserDocument extends IUser, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      minLength: [1, 'Minimum length for user name is 1 character'],
      maxLength: [15, 'Maximum length for user name is 15 characters'],
    },
    email: {
      type: String,
      require: true,
      unique: true,
      match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    },
    password: {
      type: String,
      require: true,
      minLength: [6, 'Minimum length for password is 6 character'],
      maxLength: [12, 'Maximum length for password is 12 characters'],
    },
    isPro: { type: String, require: true },
    avatar: { type: String, require: false },
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model<IUserDocument>('User', userSchema);
