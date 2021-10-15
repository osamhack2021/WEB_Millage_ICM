/* Types of Comment */

export type Comment = {
  id: number;
  content: string;
  writer: {
    id: number;
    fullname: string;
    nickname: string;
  },
  heartCount: number;
  liked: boolean;
  createdAt: Date;
  isDeleted: boolean;
  parentCommentId: number;
};
