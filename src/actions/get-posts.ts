'use server';
import { api } from '@/lib/api';
import { PostWithUser } from '@/types/post-with-user';

export async function getPosts(): Promise<PostWithUser[]> {
  try {
    const res = await api('/posts', {
      method: 'GET',
      next: {
        tags: ['posts'],
      },
    });

    if (!res.ok) {
      throw new Error('failed to fetch posts');
    }

    const responseBody = await res.json();
    return responseBody.posts;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
