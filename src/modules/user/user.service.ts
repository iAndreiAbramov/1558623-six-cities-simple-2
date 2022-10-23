import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { IUserService } from './user.types';
import CreateUserDto from './dto/create-user.dto.js';
import { UserEntity } from './user.entity.js';
import { ILoggerService } from '../../common/logger/logger.types.js';
import { Component } from '../../types/component.types.js';

@injectable()
export default class UserService implements IUserService {
  private logger!: ILoggerService;
  private userModel!: types.ModelType<UserEntity>;

  constructor(
    @inject(Component.ILoggerService) providedLogger: ILoggerService,
    @inject(Component.UserModel) providedUserModel: types.ModelType<UserEntity>,
  ) {
    this.logger = providedLogger;
    this.userModel = providedUserModel;
  }

  async create(
    dto: CreateUserDto,
    salt: string,
  ): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const newUser = await this.userModel.create(user);
    this.logger.info(`New user with email ${user.email} created`);

    return newUser;
  }

  async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({ email });
  }

  async findOrCreate(
    dto: CreateUserDto,
    salt: string,
  ): Promise<DocumentType<UserEntity>> {
    const existingUser = await this.userModel.findOne({ email: dto.email });
    return existingUser ? existingUser : this.create(dto, salt);
  }

  async exists(documentId: string): Promise<boolean> {
    const existingEntity = await this.userModel.findById(documentId);
    return !!existingEntity;
  }
}
