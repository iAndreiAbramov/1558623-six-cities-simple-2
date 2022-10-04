import { DocumentType, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { CommentEntity } from './comment.entity.js';
import { OfferEntity } from '../offer/offer.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import GetCommentsDto from './dto/get-comments.dto.js';

export interface IComment {
  text: string;
  rating: number;
  authorId: Ref<UserEntity>;
  offerId: Ref<OfferEntity>;
}

export interface ICommentService {
  create: (dto: CreateCommentDto) => Promise<DocumentType<CommentEntity>>;
  getList: (dto: GetCommentsDto) => Promise<DocumentType<CommentEntity>[]>;
  deleteByOfferId: (offerId: string) => Promise<number>;
}
