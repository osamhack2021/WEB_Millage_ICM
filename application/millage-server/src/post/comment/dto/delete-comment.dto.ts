import {ResultObject} from '../../../common/common.interface';
import {CommentEntity} from '../comment.entity';

export type DeleteCommentDTO = ResultObject & {
    comment?: CommentEntity;
    id?: number;
};
