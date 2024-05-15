import { Comment } from './comment';
import { User } from './user';

export type CommentWithUser = Comment & {
  user: User;
  parentId?: string | null;
  parent?: CommentWithUser | null;
  totalComments: number;
  totalLikes: number;
  isLiked: boolean;
};
