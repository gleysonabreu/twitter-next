'use server';

import { SignUpSchema } from '@/app/auth/sign-up/components/sign-up-form';
import { api } from '@/lib/api';

export async function registerUser(data: SignUpSchema) {
  try {
    const res = await api('/accounts', {
      cache: 'no-cache',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    if (res.status === 201) {
      return { success: true, message: 'User registered successfully' };
    }

    if (res.status === 400) {
      const responseBody = await res.json();

      if (responseBody.errors.details) {
        const errors = responseBody.errors.details;
        return {
          success: false,
          message: responseBody.message,
          errors: errors.map((error: any) => {
            return {
              name: error.path[0],
              message: error.message,
            };
          }),
        };
      }

      return {
        success: false,
        message: responseBody.message,
      };
    }

    if (res.status === 409) {
      const responseBody = await res.json();

      return { success: false, message: responseBody.message };
    }

    return { success: false, message: 'Something went wrong, try again!' };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to connect to server, try again!',
    };
  }
}
