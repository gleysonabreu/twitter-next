import { FollowUser } from '@/components/follow-user';
import { getProfileByUsername } from '@/actions/get-profile-by-username';
import { Metadata } from 'next';
import { HeaderProfile } from '../components/header-profile';
import { notFound } from 'next/navigation';
import { fetchFollowing } from '@/actions/fetch-following';

type FollowingPageProps = {
  params: { username: string };
};

export async function generateMetadata({
  params,
}: FollowingPageProps): Promise<Metadata> {
  const username = params.username;
  const profile = await getProfileByUsername(username);

  let title = '';

  if (!profile) {
    title = 'Profile';
  } else {
    title = `People followed by ${profile?.firstName} (@${profile?.username})`;
  }

  return {
    title,
  };
}

export default async function FollowingPage({ params }: FollowingPageProps) {
  const username = params.username;
  const user = await getProfileByUsername(username);

  if (!user) {
    notFound();
  }

  const following = await fetchFollowing(user.id);

  return (
    <>
      <HeaderProfile title={user.firstName} subtitle={`@${user.username}`} />
      <div className="w-full">
        {following.length > 0 ? (
          <div className="flex flex-col">
            {following.map((follow) => {
              return <FollowUser user={follow} key={follow.id} />;
            })}
          </div>
        ) : (
          <h1 className="text-center p-8 text-muted-foreground">
            {user.firstName} is not following anyone.
          </h1>
        )}
      </div>
    </>
  );
}
