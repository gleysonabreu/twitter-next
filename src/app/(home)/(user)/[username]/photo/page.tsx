import { getProfileByUsername } from '@/actions/get-profile-by-username';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { env } from '@/config/env';
import { notFound } from 'next/navigation';
import { HeaderProfile } from '../components/header-profile';

type PhotoProps = {
  params: {
    username: string;
  };
};

export default async function Photo({ params }: PhotoProps) {
  const profile = await getProfileByUsername(params.username);

  if (!profile) notFound();

  return (
    <>
      <HeaderProfile title={profile.firstName} subtitle="Photo" />
      <div className="flex flex-1 justify-center items-center">
        <Avatar className="h-60 w-60">
          <AvatarImage
            src={`${env.NEXT_PUBLIC_URL_IMAGES}/${profile.profileImage}`}
            alt={profile.username}
          />
          <AvatarFallback>
            {profile.firstName.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </>
  );
}
