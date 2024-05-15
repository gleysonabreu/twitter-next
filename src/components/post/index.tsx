import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

import { ProfileHoverCard } from '../profile-hover-card';
import { PostMenu } from './post-menu';
import { PostActions } from './post-actions';
import { env } from '@/config/env';
import { currentUser } from '@/actions/auth';
import { PostWithUser } from '@/types/post-with-user';

export type PostProps = PostWithUser;

export async function Post({
  content,
  createdAt,
  user,
  userId,
  id,
  updatedAt,
  isFavorite,
  isLiked,
  totalLikes,
  totalComments,
}: PostProps) {
  const auth = await currentUser();
  const shareContent = `${env.APP_URL}/${user.username}/status/${id}`;

  return (
    <div className="flex flex-col items-start gap-2 first:border-t-0 border-t p-3 text-left text-sm transition-all">
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <ProfileHoverCard id={userId}>
            <Link
              href={`/${user.username}`}
              className="flex items-center gap-2 group"
            >
              <Avatar className="h-10 w-10">
                {user.profileImage && (
                  <AvatarImage
                    src={`${env.NEXT_PUBLIC_URL_IMAGES}/${user.profileImage}`}
                    alt={user.username}
                  />
                )}
                <AvatarFallback>
                  {user.firstName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="font-semibold group-hover:underline">
                  {user.firstName} {user.lastName}
                </div>
                <div className="font-normal text-muted-foreground">
                  @{user.username}
                </div>
              </div>
            </Link>
          </ProfileHoverCard>
          <div className="ml-auto flex items-center gap-2 text-muted-foreground">
            <Link
              href={`/${user.username}/status/${id}`}
              className="hover:underline text-xs flex items-center gap-1 text-center"
            >
              {updatedAt && (
                <>
                  <span className="text-muted-foreground">edited</span>
                  <span className="flex w-1.5 h-1.5 bg-primary/70 rounded-full flex-shrink-0" />
                </>
              )}
              <span>{dayjs().to(createdAt)}</span>
            </Link>
            {auth?.id === user.id && <PostMenu id={id} />}
          </div>
        </div>
      </div>
      <div className="ml-12 pb-3 text-base">{content}</div>
      <PostActions
        username={user.username}
        shareContent={shareContent}
        isFavorite={isFavorite}
        postId={id}
        isLiked={isLiked}
        totalLikes={totalLikes}
        totalComments={totalComments}
      />
    </div>
  );
}
