import {CreateBoardDto} from '../board/dto';
import {AuthType} from '../board/board.interface';

export const getSamplePlace = (unitId: number, unitName: string) => {
  return {
    name: `${unitName} 체육관`,
    seats: 10,
    description: '시설물 예시입니다.',
    unitId,
  };
};

export const createBasicBoards = (
    unitId: number,
    unitName: string
): CreateBoardDto[] => {
  return [
    {
      title: '공지게시판',
      description: `${unitName} 공지 사항입니다.`,
      auth: AuthType.ADMIN,
      anonymous: false,
      pollAllowed: false,
      recruitAllowed: false,
      imageAllowed: true,
      unitId,
    },
    {
      title: '자유게시판',
      description: `${unitName} 자유 게시판입니다.`,
      auth: AuthType.ALL,
      anonymous: false,
      pollAllowed: true,
      recruitAllowed: false,
      imageAllowed: true,
      unitId,
    },
    {
      title: '설문게시판',
      description: `설문을 자유롭게 진행해보세요!`,
      auth: AuthType.ALL,
      anonymous: false,
      pollAllowed: true,
      recruitAllowed: false,
      imageAllowed: true,
      unitId,
    },
    {
      title: '모집게시판',
      description: `다양한 모집 글을 올리는 곳입니다.`,
      auth: AuthType.ALL,
      anonymous: false,
      pollAllowed: false,
      recruitAllowed: true,
      imageAllowed: true,
      unitId,
    },
    {
      title: '민원게시판',
      description: `${unitName} 민원 사항을 올릴 수 있습니다.`,
      auth: AuthType.ALL,
      anonymous: true,
      pollAllowed: false,
      recruitAllowed: false,
      imageAllowed: true,
      unitId,
    },
  ];
};
