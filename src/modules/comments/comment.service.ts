import { DocumentType } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { ICommentService } from './comment.types';
import { ILoggerService } from '../../common/logger/logger.types';
import { Component } from '../../types/component.types.js';
import { CommentEntity } from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import GetCommentsDto from './dto/get-comments.dto.js';
import { DEFAULT_COMMENTS_NUMBER } from '../../constants/common.constants.js';

@injectable()
export default class CommentService implements ICommentService {
  constructor(
    @inject(Component.ILoggerService) private readonly logger: ILoggerService,
    @inject(Component.CommentModel)
    private readonly commentModel: ModelType<CommentEntity>,
  ) {}

  async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const newComment = await this.commentModel.create(dto);
    this.logger.info('New comment created');
    return newComment;
  }

  async getList(dto: GetCommentsDto): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({ offerId: dto.offerId })
      .limit(dto.commentsNumber || DEFAULT_COMMENTS_NUMBER);
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel.deleteMany({ offerId });

    return result.deletedCount;
  }
}
