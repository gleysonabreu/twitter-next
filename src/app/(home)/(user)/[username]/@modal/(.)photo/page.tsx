import { getProfileByUsername } from '@/actions/get-profile-by-username';
import { ModalPhoto } from '@/components/modal-photo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { env } from '@/config/env';

type PageModalPhotoProps = {
  params: {
    username: string;
  };
};

export default async function PageModalPhoto({ params }: PageModalPhotoProps) {
  const profile = await getProfileByUsername(params.username);

  return (
    <ModalPhoto>
      <Avatar className="h-60 w-60">
        {profile?.profileImage && (
          <AvatarImage
            src={`${env.NEXT_PUBLIC_URL_IMAGES}/${profile.profileImage}`}
            alt={profile.username}
          />
        )}
        <AvatarFallback>
          {profile?.firstName.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </ModalPhoto>
  );
}
