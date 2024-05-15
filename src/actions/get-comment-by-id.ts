'use server';
import { api } from '@/lib/api';
import { Comment } from '@/types/comment';

export async function getCommentById(id: string): Promise<Comment> {
  try {
    const res = await api(`/comments/${id}`, {
      method: 'GET',
      cache: 'no-cache',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch comment');
    }

    const responseBody = await res.json();
    return responseBody.comment;
  } catch (error) {
    throw error;
  }
}
