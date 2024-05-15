import { getComments } from '@/actions/get-comments';
import { Comment } from '@/components/comment';
import { CommentForm } from '@/components/comment-form';
import { siteConfig } from '@/config/site';
import { Metadata } from 'next';
import { getPost } from './layout';

type PostPageProps = {
  params: { postId: string; username: string };
};

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const postId = params.postId;
  const post = await getPost(postId);

  let title = '';

  if (!post) {
    title = 'Page not found';
  } else {
    title = `${post.user.firstName} on ${
      siteConfig.name
    }: "${post.content.substring(0, 30)}"`;
  }

  return {
    title,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { postId, username } = params;
  const comments = await getComments(postId);

  return (
    <>
      <CommentForm postId={postId} />
      <div>
        {comments.map((comment) => (
          <Comment postOwner={username} key={comment.id} {...comment} />
        ))}
      </div>
    </>
  );
}
