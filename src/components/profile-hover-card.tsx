'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import {
  ReactNode,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from 'react';
import { numberFormatter } from '@/lib/formatter';
import Link from 'next/link';
import { env } from '@/config/env';
import { UserDetails } from '@/types/user-details';
import { findUserDetailsById } from '@/actions/get-user-details-by-id';
import Loading from '@/app/(home)/loading';

type ProfileHoverCardProps = {
  children: ReactNode;
  id: string;
};

export function ProfileHoverCard({ children, id }: ProfileHoverCardProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [user, setUser] = useState<UserDetails | null>(null);

  const [isPending, startTransition] = useTransition();

  const fetchUserDetails = useCallback(() => {
    startTransition(() => {
      findUserDetailsById(id)
        .then((res) => {
          setUser(res);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, [id]);

  useEffect(() => {
    if (open === true) {
      fetchUserDetails();
    }
  }, [fetchUserDetails, open]);

  return (
    <HoverCard open={open} onOpenChange={setOpen}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80">
        {isPending ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <Link href={`/${user?.username}`}>
                <Avatar className="h-14 w-14">
                  {user?.profileImage && (
                    <AvatarImage
                      src={`${env.NEXT_PUBLIC_URL_IMAGES}/${user.profileImage}`}
                      alt={user.username}
                    />
                  )}
                  <AvatarFallback>
                    {user?.firstName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
            <div className="space-y-1">
              <Link
                href={`/${user?.username}`}
                className="text-sm font-semibold"
              >
                @{user?.username}
              </Link>
              <p>{user?.bio}</p>
              <div className="inline-flex items-center gap-2">
                <span className="text-muted-foreground">
                  <b className="text-muted-foreground">
                    {numberFormatter.format(user?.totalPosts as number)}
                  </b>{' '}
                  posts
                </span>
                <Link
                  href={`/${user?.username}/followers`}
                  className="hover:underline text-muted-foreground"
                >
                  <b className="text-muted-foreground">
                    {numberFormatter.format(user?.followedBy as number)}
                  </b>{' '}
                  Followers
                </Link>
                <Link
                  href={`/${user?.username}/following`}
                  className="hover:underline text-muted-foreground"
                >
                  <b className="text-muted-foreground">
                    {numberFormatter.format(user?.following as number)}
                  </b>{' '}
                  Following
                </Link>
              </div>
              <div className="flex items-center pt-2">
                <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{' '}
                <span className="text-xs text-muted-foreground">
                  Joined {dayjs(user?.createdAt).format('MMMM YYYY')}
                </span>
              </div>
            </div>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
