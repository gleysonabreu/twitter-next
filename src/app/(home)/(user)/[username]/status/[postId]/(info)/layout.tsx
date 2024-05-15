import { getPostById } from '@/actions/get-post-by-id';
import { Post } from '@/components/post';
import { Separator } from '@/components/ui/separator';
import { notFound, redirect } from 'next/navigation';
import { HeaderProfile } from '../../../components/header-profile';
import { ReactNode } from 'react';

type LayoutPostProps = {
  params: { postId: string; username: string };
  children: ReactNode;
};

export const getPost = async (id: string) => {
  try {
    const post = await getPostById(id);
    return post;
  } catch (error) {
    return undefined;
  }
};

export default async function LayoutPost({
  params,
  children,
}: LayoutPostProps) {
  const { postId, username } = params;
  const post = await getPost(postId);

  if (!post) {
    notFound();
  }

  if (post.user.username !== username) {
    redirect(`/${post?.user.username}/status/${post.id}`);
  }

  return (
    <>
      <HeaderProfile title="Post" />
      <div>
        <Post {...post} />
      </div>
      <Separator />

      <div>{children}</div>
    </>
  );
}
