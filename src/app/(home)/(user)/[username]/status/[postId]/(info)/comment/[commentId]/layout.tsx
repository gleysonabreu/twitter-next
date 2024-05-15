import { getCommentDetails } from '@/actions/get-comment-details';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { Comment } from '@/components/comment';
import { Separator } from '@/components/ui/separator';
import { currentUser } from '@/actions/auth';

type LayoutCommentProps = {
  params: { postId: string; username: string; commentId: string };
  children: ReactNode;
};

export default async function LayoutPost({
  params,
  children,
}: LayoutCommentProps) {
  const { commentId, username } = params;
  const comment = await getCommentDetails(commentId);

  if (!comment) notFound();

  return (
    <div>
      {comment.parent && <Comment postOwner={username} {...comment.parent} />}
      <Comment postOwner={username} {...comment} />
      <Separator />
      <div>{children}</div>
    </div>
  );
}
