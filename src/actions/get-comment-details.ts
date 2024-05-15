'use server';
import { api } from '@/lib/api';
import { CommentWithUser } from '@/types/comment-with-user';

export async function getCommentDetails(
  id: string,
): Promise<CommentWithUser | undefined> {
  try {
    const res = await api(`/comments/${id}/details`, {
      method: 'GET',
      cache: 'no-cache',
    });

    if (!res.ok) {
      return undefined;
    }

    const responseBody = await res.json();
    return responseBody.comment;
  } catch (error) {
    throw error;
  }
}
