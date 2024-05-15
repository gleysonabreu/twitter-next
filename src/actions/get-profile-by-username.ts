'use server';
import { api } from '@/lib/api';
import { UserDetails } from '@/types/user-details';

export async function getProfileByUsername(
  username: string,
): Promise<UserDetails | undefined> {
  const res = await api(`/users?username=${username}`, {
    method: 'GET',
    cache: 'no-cache',
  });

  if (!res.ok) {
    return undefined;
  }

  const responseBody = await res.json();
  return responseBody.user;
}
