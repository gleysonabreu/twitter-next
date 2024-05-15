import { Post } from './post';
import { User } from './user';

export type PostWithUser = Post & {
  isFavorite: boolean;
  isLiked: boolean;
  totalLikes: number;
  totalComments: number;
  user: User;
};
