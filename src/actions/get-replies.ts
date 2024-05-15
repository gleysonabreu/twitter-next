'use server';
import { api } from '@/lib/api';
import { CommentWithUser } from '@/types/comment-with-user';

export async function getReplies(
  commentId: string,
): Promise<CommentWithUser[]> {
  try {
    const res = await api(`/comments/${commentId}/reply`, {
      method: 'GET',
      next: {
        tags: ['replies'],
      },
    });

    if (!res.ok) {
      throw new Error('failed to fetch comments');
    }

    const responseBody = await res.json();
    const comments = responseBody.comments;

    return comments;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
