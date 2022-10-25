import typegoose, {
  defaultClasses,
  getModelForClass,
} from '@typegoose/typegoose';
import { IUser } from '../../types/user.types.js';
import { createSHA256 } from '../../utils/common.utils.js';
import { DEFAULT_AVATAR } from '../../constants/common.constants.js';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'Users',
  },
})
export class UserEntity extends defaultClasses.TimeStamps implements IUser {
  constructor(data: IUser) {
    super();

    this.name = data.name;
    this.email = data.email;
    this.avatar = data.avatar || '';
    this.isPro = data.isPro;
  }

  @prop({
    required: true,
    default: '',
    minlength: [1, 'Name minimum length is 1 character'],
    maxlength: [15, 'Name maximum length is 15 characters'],
    trim: true,
  })
  name!: string;

  @prop({
    required: true,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
  })
  email!: string;

  @prop({
    required: false,
    default: DEFAULT_AVATAR,
    match: [/\.jpg|\.png$/, 'Image format must be .jpg or .png'],
  })
  avatar?: string;

  @prop({
    required: true,
    default: '',
    trim: true,
  })
  private password!: string;

  @prop({ required: true, default: false })
  isPro!: boolean;

  setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
