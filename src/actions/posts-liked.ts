'use server';

import { api } from '@/lib/api';
import { PostWithUser } from '@/types/post-with-user';

export async function fetchPostsLiked(): Promise<PostWithUser[]> {
  try {
    const res = await api('/likes', {
      method: 'GET',
      next: {
        tags: ['posts-liked'],
      },
    });

    if (!res.ok) {
      throw new Error('failed to fetch posts liked');
    }

    const responseBody = await res.json();
    const posts = responseBody.posts;

    return posts;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
