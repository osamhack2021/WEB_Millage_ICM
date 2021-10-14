import {AuthType} from '../board.interface';

export class UpdateBoardDto {
  title?: string;

  description?: string;

  auth?: AuthType;

  anonymous?: boolean;

  pollAllowed?: boolean;

  recruitAllowed?: boolean;

  imageAllowed?: boolean;
}
