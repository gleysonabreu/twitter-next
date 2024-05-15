import { User } from './user';

export type UserDetails = User & {
  totalPosts: number;
  followedBy: number;
  following: number;
  isFollowing: boolean;
};
