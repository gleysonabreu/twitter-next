import { getPosts } from '@/actions/get-posts';
import { Post } from '@/components/post';

export async function Posts() {
  const posts = await getPosts();

  return (
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
  );
}
