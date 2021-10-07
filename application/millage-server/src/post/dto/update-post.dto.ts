import {OmitType} from '@nestjs/swagger';
import {CreatePostDto} from '.';

export class UpdatePostDto extends OmitType(
    CreatePostDto,
    ['boardId'] as const
) {}
