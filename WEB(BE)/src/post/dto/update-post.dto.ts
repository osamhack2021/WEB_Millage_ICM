import {PostType} from '../post.interface';

export class UpdatePostDto {
    postType?: PostType;

    title?: string;

    content?: string;

    pollItems?: string[];

    totalMember?: number;
}
