'use server';

import { api } from '@/lib/api';
import { UserDetails } from '@/types/user-details';

export async function searchUser(
  query: string,
  page: number,
): Promise<UserDetails[]> {
  try {
    const res = await api(`/search?query=${query}&page=${page}`, {
      method: 'GET',
      cache: 'no-cache',
    });

    if (!res.ok) {
      throw new Error('failed to search user');
    }

    const responseBody = await res.json();
    const users = responseBody.users;

    return users;
  } catch (error) {
    throw error;
  }
}
