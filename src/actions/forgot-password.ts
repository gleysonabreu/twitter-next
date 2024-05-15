'use server';

import { ForgotPasswordSchemaType } from '@/app/auth/forgot-password/components/forgot-password-form';
import { api } from '@/lib/api';

export async function forgotPassword(data: ForgotPasswordSchemaType) {
  try {
    const res = await api('/accounts/forgot-password', {
      cache: 'no-cache',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    if (res.status === 201) {
      return {
        success: true,
        message: 'Email with link to change password has been sent.',
      };
    }

    if (res.status === 400) {
      const responseBody = await res.json();

      if (responseBody.errors?.details) {
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

    if (res.status === 404) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    return { success: false, message: 'Something went wrong, try again!' };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to connect to server, try again!',
    };
  }
}
