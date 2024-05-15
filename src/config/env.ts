import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    APP_URL: z.string().url(),
    AUTH_SECRET: z.string(),
    DEFAULT_LOGIN_REDIRECT: z.string(),
  },
  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
    NEXT_PUBLIC_URL_IMAGES: z.string().url(),
  },

  runtimeEnv: {
    APP_URL: process.env.APP_URL,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    DEFAULT_LOGIN_REDIRECT: process.env.DEFAULT_LOGIN_REDIRECT,
    NEXT_PUBLIC_URL_IMAGES: process.env.NEXT_PUBLIC_URL_IMAGES,
  },
});
