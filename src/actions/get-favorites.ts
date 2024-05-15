'use server';
import { api } from '@/lib/api';
import { PostWithUser } from '@/types/post-with-user';

export async function getFavorites(): Promise<PostWithUser[]> {
  try {
    const res = await api('/favorites', {
      method: 'GET',
      next: {
        tags: ['favorites'],
      },
    });

    if (!res.ok) {
      throw new Error('failed to fetch favorite posts');
    }

    const responseBody = await res.json();
    const posts = responseBody.posts;

    return posts;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
