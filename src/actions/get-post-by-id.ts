'use server';
import { api } from '@/lib/api';
import { PostWithUser } from '@/types/post-with-user';

export async function getPostById(id: string): Promise<PostWithUser> {
  try {
    const res = await api(`/posts/${id}`, {
      method: 'GET',
      cache: 'no-cache',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch post');
    }

    const responseBody = await res.json();
    return responseBody.post;
  } catch (error) {
    throw error;
  }
}
