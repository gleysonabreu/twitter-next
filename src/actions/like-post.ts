'use server';

import { api } from '@/lib/api';
import { revalidatePath } from 'next/cache';

export async function likePost(id: string, isLiked: boolean) {
  const method = isLiked ? 'DELETE' : 'POST';
  const url = isLiked ? `/posts/${id}/unlike` : `/posts/${id}/like`;
  const message = isLiked ? 'Unlike post' : 'Liked post';

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
