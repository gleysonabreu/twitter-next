'use server';

import { SignSchemaType } from '@/app/auth/sign-in/components/sign-in-form';
import { signIn } from '../../auth';
import { AuthError } from 'next-auth';
import { env } from '@/config/env';

export async function login(
  formData: SignSchemaType,
  callbackUrl?: string | null,
) {
  try {
    await signIn('credentials', {
      ...formData,
      redirectTo: callbackUrl || env.DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Email/username or password are invalid' };
        default:
          return { error: 'Something went wrong. Try again!' };
      }
    }
    throw error;
  }
}
