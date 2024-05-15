import { api } from '@/lib/api';
import { UserDetails } from '@/types/user-details';

export async function fetchFollowing(userId: string): Promise<UserDetails[]> {
  try {
    const res = await api(`/users/${userId}/following`, {
      method: 'GET',
      next: {
        tags: ['following-users'],
      },
    });

    if (!res.ok) {
      throw new Error('failed to fetch following users');
    }

    const responseBody = await res.json();
    const users = responseBody.following;

    return users;
  } catch (error) {
    throw error;
  }
}
