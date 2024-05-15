'use server';
import { api } from '@/lib/api';
import { PostWithUser } from '@/types/post-with-user';

export async function getFeedProfile(userId: string): Promise<PostWithUser[]> {
  try {
    const res = await api(`/profile/${userId}/feed`, {
      method: 'GET',
      next: {
        tags: ['feed-profile'],
      },
    });

    if (!res.ok) {
      throw new Error('failed to fetch profile posts');
    }

    const responseBody = await res.json();
    return responseBody.posts;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
