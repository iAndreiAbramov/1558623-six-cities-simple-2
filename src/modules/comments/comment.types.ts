import { DocumentType, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { CommentEntity } from './comment.entity.js';
import { OfferEntity } from '../offer/offer.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import {IDocumentExists} from '../../types/document-exists.interface';

export interface IComment {
  text: string;
  rating: number;
  authorId: Ref<UserEntity>;
  offerId: Ref<OfferEntity>;
}

export interface ICommentService extends IDocumentExists {
  create: (dto: CreateCommentDto) => Promise<DocumentType<CommentEntity>>;
  getList: (offerId: string) => Promise<DocumentType<CommentEntity>[]>;
  deleteByOfferId: (offerId: string) => Promise<number>;
}
