import { getCommentDetails } from '@/actions/get-comment-details';
import { getPostById } from '@/actions/get-post-by-id';
import { getReplies } from '@/actions/get-replies';
import { Comment } from '@/components/comment';
import { ReplyForm } from '@/components/reply-form';
import { siteConfig } from '@/config/site';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type CommentProps = {
  params: { username: string; postId: string; commentId: string };
};

export async function generateMetadata({
  params,
}: CommentProps): Promise<Metadata> {
  const { commentId, username } = params;
  const comment = await getCommentDetails(commentId);

  let title = '';

  if (!comment) {
    title = 'Page not found';
  } else {
    title = `${comment.user.firstName} on ${
      siteConfig.name
    }: "@${username} ${comment.content.substring(0, 15)}"`;
  }

  return {
    title,
  };
}

const getPost = async (id: string) => {
  try {
    const post = await getPostById(id);
    return post;
  } catch (error) {
    return undefined;
  }
};

export default async function Replies({ params }: CommentProps) {
  const { commentId, postId, username } = params;

  const post = await getPost(postId);

  if (!post) {
    notFound();
  }

  const comment = await getCommentDetails(commentId);

  if (!comment) {
    notFound();
  }

  const replies = await getReplies(commentId);

  return (
    <>
      <ReplyForm commentId={commentId} />
      <div>
        {replies.map((reply) => (
          <Comment postOwner={username} {...reply} key={reply.id} />
        ))}
      </div>
    </>
  );
}
