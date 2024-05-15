import { Cake, Calendar } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getProfileByUsername } from '@/actions/get-profile-by-username';
import { notFound } from 'next/navigation';
import dayjs from 'dayjs';
import { currentUser } from '@/actions/auth';
import { PostForm } from '../components/post-form';
import { getFeedProfile } from '@/actions/feed-profile';
import { Post } from '@/components/post';
import { FollowButton } from '@/components/follow-button';
import { numberFormatter } from '@/lib/formatter';
import Link from 'next/link';
import { HeaderProfile } from './components/header-profile';
import { Metadata } from 'next';
import { env } from '@/config/env';

type ProfileProps = {
  params: { username: string };
};

export async function generateMetadata({
  params,
}: ProfileProps): Promise<Metadata> {
  const username = params.username;
  const profile = await getProfileByUsername(username);

  let title = '';

  if (!profile) {
    title = 'Profile';
  } else {
    title = `${profile.firstName} (@${profile.username})`;
  }

  return {
    title,
  };
}

export default async function Profile({ params }: ProfileProps) {
  const user = await currentUser();
  const username = params.username;
  const profile = await getProfileByUsername(username);

  if (!profile) {
    notFound();
  }

  const posts = await getFeedProfile(profile.id);

  return (
    <div>
      <HeaderProfile
        title={profile.firstName}
        subtitle={`${profile.totalPosts} posts`}
      />

      <div className="flex-grow-1">
        <div>
          <div className="bg-muted h-44 relative">
            {profile.coverImage && (
              <Image
                src={`${env.NEXT_PUBLIC_URL_IMAGES}/${profile.coverImage}`}
                fill
                alt={`@${profile.username}`}
                className="object-cover h-auto w-auto object-top"
              />
            )}

            <div className="absolute -bottom-16 left-4">
              <Link href={`/${profile.username}/photo`}>
                <Avatar className="h-28 w-28 lg:h-36 lg:w-36 border-2 lg:border-4 border-background bg-background">
                  {profile.profileImage && (
                    <AvatarImage
                      src={`${env.NEXT_PUBLIC_URL_IMAGES}/${profile.profileImage}`}
                      alt={profile.username}
                    />
                  )}
                  <AvatarFallback>
                    {profile.firstName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>

          <div className="border-b pb-4">
            <div className="flex justify-end p-2">
              {profile.id === user?.id ? (
                <Button variant="outline" asChild>
                  <Link href="/settings/images">Edit profile</Link>
                </Button>
              ) : (
                <FollowButton
                  isFollowing={profile.isFollowing}
                  userId={profile.id}
                />
              )}
            </div>
            <div className="mt-8 px-4">
              <div className="flex flex-col">
                <p className="text-xl font-bold">
                  {profile.firstName} {profile.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  @{profile.username}
                </p>
              </div>
              <div className="flex flex-col mt-4">
                {profile.bio && (
                  <p className="text-sm font-normal">{profile.bio}</p>
                )}
                <div className="flex flex-col sm:flex-row items-start gap-3 mt-4">
                  <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar size={18} />
                    Joined {dayjs(profile.createdAt).format('MMMM D, YYYY	')}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <Cake size={18} />
                    Born in {dayjs(profile.birthDate).format('MMMM D, YYYY	')}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-start gap-3 mt-4">
                  <Link
                    href={`/${profile.username}/followers`}
                    className="hover:underline inline-flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <b className="text-muted-foreground">
                      {numberFormatter.format(profile.followedBy)}
                    </b>{' '}
                    Followers
                  </Link>
                  <Link
                    href={`/${profile.username}/following`}
                    className="hover:underline inline-flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <b className="text-muted-foreground">
                      {numberFormatter.format(profile.following)}
                    </b>{' '}
                    Following
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {user?.username === profile.username && <PostForm />}

        <>
          {posts.length === 0 ? (
            <div className="border-b border-t p-5 text-center text-muted-foreground">
              <h1>No posts at this time</h1>
            </div>
          ) : (
            <div className="flex flex-col last:border-b">
              {posts.map((post) => (
                <Post key={post.id} {...post} />
              ))}
            </div>
          )}
        </>
      </div>
    </div>
  );
}
