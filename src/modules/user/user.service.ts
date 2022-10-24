import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { IUserService } from './user.types';
import CreateUserDto from './dto/create-user.dto.js';
import { UserEntity } from './user.entity.js';
import { ILoggerService } from '../../common/logger/logger.types.js';
import { Component } from '../../types/component.types.js';
import { LoginUserDto } from './dto/login-user.dto';

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

  async findById(id: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findById(id);
  }

  async updateAvatar(id: string, avatar: string): Promise<UserEntity | null> {
    return await this.userModel.findByIdAndUpdate(
      id,
      { avatar },
      { new: true },
    );
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

  async verifyUser(dto: LoginUserDto, salt: string) {
    const existingUser = await this.findByEmail(dto.email);

    if (!existingUser) {
      return null;
    }

    if (existingUser.verifyPassword(dto.password, salt)) {
      return existingUser;
    }

    return null;
  }
}
