'use client';
import { Share as SharePost } from './share';
import { PostActionButton } from './post/post-action-button';
import { useRouter } from 'next/navigation';
import { numberFormatter } from '@/lib/formatter';
import { Heart, MessageCircle, Share } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { likeComment } from '@/actions/like-comment';

type CommentsActionsProps = {
  shareContent: string;
  totalComments: number;
  totalLikes: number;
  isLiked: boolean;
  id: string;
};

export function CommentActions({
  totalComments,
  shareContent,
  totalLikes,
  isLiked,
  id,
}: CommentsActionsProps) {
  const [likes, setLikes] = useState(totalLikes);
  const [liked, setLiked] = useState(isLiked);
  const router = useRouter();

  const [isPending, StartTransition] = useTransition();

  useEffect(() => {
    setLikes(totalLikes);
    setLiked(isLiked);
  }, [totalLikes, isLiked]);

  function handleLikeComment() {
    StartTransition(() => {
      likeComment(id, liked).then((res) => {
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

  return (
    <div className="flex mt-3 mx-auto items-stretch flex-row justify-between w-full max-w-[500px] gap-1">
      <div className="flex items-center gap-5">
        <PostActionButton
          onClick={() => router.push(shareContent)}
          title={numberFormatter.format(totalComments)}
        >
          <MessageCircle size={18} />
        </PostActionButton>
        <PostActionButton
          variant="red"
          onClick={handleLikeComment}
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
        <SharePost content={shareContent}>
          <PostActionButton variant="green">
            <Share size={18} />
          </PostActionButton>
        </SharePost>
      </div>
    </div>
  );
}
