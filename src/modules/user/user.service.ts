import { DocumentType } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { IUserService } from './user-service.types.js';
import CreateUserDto from './dto/create-user.dto.js';
import { UserEntity, UserModel } from './user.entity.js';
import { ILoggerService } from '../../common/logger/logger.types.js';
import { Component } from '../../types/component.types.js';

@injectable()
export default class UserService implements IUserService {
  private logger!: ILoggerService;

  constructor(
    @inject(Component.ILoggerService) providedLogger: ILoggerService,
  ) {
    this.logger = providedLogger;
  }

  async create(
    dto: CreateUserDto,
    salt: string,
  ): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const newUser = await UserModel.create(user);
    this.logger.info(`New user with email ${user.email} created`);

    return newUser;
  }

  async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return UserModel.findOne({ email });
  }

  async findOrCreate(
    dto: CreateUserDto,
    salt: string,
  ): Promise<DocumentType<UserEntity>> {
    const existingUser = await UserModel.findOne({ email: dto.email });
    return existingUser ? existingUser : this.create(dto, salt);
  }
}
