import { getCurrentToken } from '@/actions/auth';
import { env } from '@/config/env';

export async function api(path: string, init?: RequestInit): Promise<Response> {
  const token = await getCurrentToken();
  const baseURL = env.NEXT_PUBLIC_API_BASE_URL;
  const preFix = '';
  const url = new URL(preFix.concat(path), baseURL);

  return fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...init?.headers,
    },
  });
}
