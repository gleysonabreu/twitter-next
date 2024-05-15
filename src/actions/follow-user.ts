'use server';

import { api } from '@/lib/api';
import { revalidatePath } from 'next/cache';

export async function followUser(userId: string, following: boolean) {
  const method = following ? 'DELETE' : 'POST';
  const message = following
    ? 'You have unfollow this user'
    : 'You started following this user';

  try {
    const res = await api(`/follows/${userId}`, {
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
