'use client';
import { useEffect, useState, useTransition } from 'react';
import { Button } from './ui/button';
import { followUser } from '@/actions/follow-user';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

type FollowButtonProps = {
  userId: string;
  isFollowing: boolean;
};

export function FollowButton({ userId, isFollowing }: FollowButtonProps) {
  const [following, setFollowing] = useState(isFollowing);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setFollowing(isFollowing);
  }, [isFollowing, userId]);

  function handleFollow() {
    startTransition(() => {
      followUser(userId, following).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        setFollowing(!following);
        toast.success(res.message);
      });
    });
  }

  return (
    <Button
      onClick={handleFollow}
      disabled={isPending}
      variant={following ? 'outline-red' : 'secondary'}
    >
      {isPending ? (
        <Loader2 className="animate-spin" />
      ) : following ? (
        'Unfollow'
      ) : (
        'Follow'
      )}
    </Button>
  );
}
