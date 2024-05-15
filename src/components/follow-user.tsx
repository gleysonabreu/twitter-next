import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FollowButton } from '@/components/follow-button';
import { ProfileHoverCard } from './profile-hover-card';
import Link from 'next/link';
import { currentUser } from '@/actions/auth';
import { UserDetails } from '@/types/user-details';
import { env } from '@/config/env';

type FollowUserProps = {
  user: UserDetails;
};

export async function FollowUser({ user }: FollowUserProps) {
  const auth = await currentUser();

  return (
    <div className="flex flex-col gap-3 py-5 px-5 border-b">
      <div className="flex items-start justify-between">
        <ProfileHoverCard id={user.id}>
          <div className="flex items-start gap-2">
            <Link href={`/${user.username}`}>
              <Avatar className="h-14 w-14">
                {user.profileImage && (
                  <AvatarImage
                    src={`${env.NEXT_PUBLIC_URL_IMAGES}/${user.profileImage}`}
                    alt={user.username}
                  />
                )}
                <AvatarFallback>
                  {user.firstName.substring(0, 2).toLocaleUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex flex-col">
              <Link
                href={`/${user.username}`}
                className="hover:underline text-lg font-semibold"
              >
                {user.firstName}
              </Link>
              <Link
                href={`/${user.username}`}
                className="hover:underline text-sm font-normal text-muted-foreground"
              >
                @{user.username}
              </Link>
            </div>
          </div>
        </ProfileHoverCard>

        {auth?.id !== user.id && (
          <FollowButton isFollowing={user.isFollowing} userId={user.id} />
        )}
      </div>
      {user.bio && <p className="pl-16">{user.bio}</p>}
    </div>
  );
}
