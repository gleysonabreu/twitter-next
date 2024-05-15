'use client';
import { Share as SharePost } from '../share';
import { cn } from '@/lib/utils';
import { PostActionButton } from './post-action-button';
import { Bookmark, Heart, MessageCircle, Share } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { favoritePost } from '@/actions/favorite-post';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { likePost } from '@/actions/like-post';
import { numberFormatter } from '@/lib/formatter';

type PostActionsProps = {
  shareContent: string;
  isFavorite: boolean;
  postId: string;
  isLiked: boolean;
  totalLikes: number;
  username: string;
  totalComments: number;
};

export function PostActions({
  isFavorite,
  postId,
  isLiked,
  totalLikes,
  shareContent,
  username,
  totalComments,
}: PostActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [favorite, setFavorite] = useState(isFavorite);
  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(totalLikes);
  const router = useRouter();

  useEffect(() => {
    setFavorite(isFavorite);
    setLiked(isLiked);
    setLikes(totalLikes);
  }, [isFavorite, postId, isLiked, totalLikes]);

  function handleLikePost() {
    startTransition(() => {
      likePost(postId, liked).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        setLiked(!liked);

        if (liked) {
          setLikes((state) => state - 1);
        } else {
          setLikes((state) => state + 1);
        }
      });
    });
  }

  function handleFavoritePost() {
    startTransition(() => {
      favoritePost(postId, favorite).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        setFavorite(!favorite);

        if (favorite) {
          toast.success(res.message);
          return;
        }

        toast.success(res.message, {
          action: {
            label: 'See',
            onClick: () => router.push('/activity?tab=favorites'),
          },
        });
      });
    });
  }

  return (
    <div className="flex mt-3 mx-auto items-stretch flex-row justify-between w-full max-w-[500px] gap-1">
      <div className="flex items-center gap-5">
        <PostActionButton
          onClick={() => router.push(`/${username}/status/${postId}`)}
          title={numberFormatter.format(totalComments)}
        >
          <MessageCircle size={18} />
        </PostActionButton>
        <PostActionButton
          variant="red"
          onClick={handleLikePost}
          disabled={isPending}
          title={numberFormatter.format(likes)}
          className={cn({
            'text-red-500': liked,
          })}
        >
          <Heart
            size={18}
            className={cn({
              'fill-red-500 text-red-500': liked,
            })}
          />
        </PostActionButton>
      </div>

      <div className="flex gap-2 items-center">
        <PostActionButton disabled={isPending} onClick={handleFavoritePost}>
          <Bookmark
            size={18}
            className={cn({
              'fill-primary text-primary': favorite,
            })}
          />
        </PostActionButton>
        <SharePost content={shareContent}>
          <PostActionButton variant="green">
            <Share size={18} />
          </PostActionButton>
        </SharePost>
      </div>
    </div>
  );
}
