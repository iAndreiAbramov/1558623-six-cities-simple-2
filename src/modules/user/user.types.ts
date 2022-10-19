import { DocumentType } from '@typegoose/typegoose';
import CreateUserDto from './dto/create-user.dto';
import { UserEntity } from './user.entity.js';
import { IDocumentExists } from '../../types/document-exists.interface';

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
}
