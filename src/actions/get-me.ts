'use server';
import { api } from '@/lib/api';
import { User } from '@/types/user';

export async function getMe(): Promise<User | null> {
  try {
    const res = await api('/me', {
      method: 'GET',
    });

    if (!res.ok) return null;

    const responseBody = await res.json();
    return responseBody;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
