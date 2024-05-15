import { api } from '@/lib/api';
import { UserDetails } from '@/types/user-details';

export async function fetchFollowers(userId: string): Promise<UserDetails[]> {
  try {
    const res = await api(`/users/${userId}/followers`, {
      method: 'GET',
      next: {
        tags: ['followers-users'],
      },
    });

    if (!res.ok) {
      throw new Error('failed to fetch followers users');
    }

    const responseBody = await res.json();
    const users = responseBody.followers;

    return users;
  } catch (error) {
    throw error;
  }
}
