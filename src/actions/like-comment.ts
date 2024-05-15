'use server';

import { api } from '@/lib/api';
import { revalidatePath } from 'next/cache';

export async function likeComment(id: string, isLiked: boolean) {
  const method = isLiked ? 'DELETE' : 'POST';
  const url = isLiked ? `/comments/${id}/unlike` : `/comments/${id}/like`;
  const message = isLiked ? 'Unlike comment' : 'Liked comment';

  try {
    const res = await api(url, {
      cache: 'no-cache',
      method,
    });

    if (!res.ok) {
      return { success: false, message: 'Something went wrong, try again!' };
    }

    revalidatePath('/');
    return { success: true, message };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to connect to server, try again!',
    };
  }
}
