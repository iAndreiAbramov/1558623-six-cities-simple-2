import { DocumentType } from '@typegoose/typegoose';
import CreateUserDto from './dto/create-user.dto';
import { UserEntity } from './user.entity.js';
import { IDocumentExists } from '../../types/document-exists.interface';
import { LoginUserDto } from './dto/login-user.dto';

export interface IUserService extends IDocumentExists {
  create: (
    dto: CreateUserDto,
    salt: string,
  ) => Promise<DocumentType<UserEntity>>;

  findByEmail: (email: string) => Promise<DocumentType<UserEntity> | null>;

  findOrCreate: (
    dto: CreateUserDto,
    salt: string,
  ) => Promise<DocumentType<UserEntity>>;

  verifyUser: (
    dto: LoginUserDto,
    salt: string,
  ) => Promise<DocumentType<UserEntity> | null>;
}
