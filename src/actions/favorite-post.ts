'use server';

import { api } from '@/lib/api';
import { revalidateTag } from 'next/cache';

export async function favoritePost(id: string, isFavorite: boolean) {
  const method = isFavorite ? 'DELETE' : 'POST';
  const url = isFavorite ? `/posts/${id}/unfavorite` : `/posts/${id}/favorite`;
  const message = isFavorite
    ? 'Post removed from favorites!'
    : 'Post added to favorites!';

  try {
    const res = await api(url, {
      cache: 'no-cache',
      method,
    });

    if (!res.ok) {
      return { success: false, message: 'Something went wrong, try again!' };
    }

    revalidateTag('favorites');
    return { success: true, message };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to connect to server, try again!',
    };
  }
}
