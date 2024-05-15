import { fetchPostsLiked } from '@/actions/posts-liked';
import { Post } from '@/components/post';
import { Shell } from 'lucide-react';

export async function Likes() {
  const posts = await fetchPostsLiked();

  return (
    <>
      {posts.length === 0 ? (
        <div className="flex flex-col flex-1 p-5 items-center justify-center text-muted-foreground">
          <Shell size={100} />
          <h1>No posts liked at this time</h1>
        </div>
      ) : (
        <div>
          <div className="flex flex-col last:border-b">
            {posts.map((post) => (
              <Post key={post.id} {...post} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
