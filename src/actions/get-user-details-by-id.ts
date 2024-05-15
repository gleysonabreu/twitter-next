'use server';
import { api } from '@/lib/api';
import { UserDetails } from '@/types/user-details';

export async function findUserDetailsById(
  id: string,
): Promise<UserDetails | null> {
  const res = await api(`/users/${id}/details`, {
    method: 'GET',
    cache: 'no-cache',
  });

  if (!res.ok) {
    return null;
  }

  const responseBody = await res.json();
  return responseBody.user;
}
