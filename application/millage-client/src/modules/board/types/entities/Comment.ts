/* Types of Comment */

export type Comment = {
  id: number;
  content: string;
  writer: {
      id: number;
      fullname: string;
      nickname: string;
  },
  heartUserIds: number[],
  createdAt: Date;
  isDeleted: boolean;
  replies?: Comment[];
};
