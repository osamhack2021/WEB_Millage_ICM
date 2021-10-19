import {ResultObject} from 'src/common/common.interface';
import {CommentEntity} from './comment.entity';

export interface CommentRO extends ResultObject {
  comment?: CommentEntity
}
