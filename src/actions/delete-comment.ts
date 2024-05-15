'use server';

import { api } from '@/lib/api';
import { revalidatePath } from 'next/cache';

export async function deleteComment(id: string) {
  try {
    const res = await api(`/comments/${id}`, {
      cache: 'no-cache',
      method: 'DELETE',
    });

    if (res.status === 204) {
      revalidatePath('/');
      return { success: true, message: 'Comment deleted!' };
    }

    if (res.status === 400 || res.status === 401 || res.status === 404) {
      const responseBody = await res.json();

      return { success: false, message: responseBody.message };
    }

    return { success: false, message: 'Something went wrong, try again!' };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to connect to server, try again!',
    };
  }
}
