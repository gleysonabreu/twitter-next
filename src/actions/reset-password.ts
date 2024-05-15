'use server';

import { ResetPasswordFormValues } from '@/app/auth/forgot-password/reset/components/reset-password-form';
import { api } from '@/lib/api';

export async function resetPassword(
  data: ResetPasswordFormValues,
  token: string,
) {
  try {
    const response = await api(`/accounts/reset-password?token=${token}`, {
      cache: 'no-cache',
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 204) {
      return {
        success: true,
        message: 'Password changed!',
      };
    }

    if (response.status === 400) {
      const responseBody = await response.json();

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

    if (response.status === 401) {
      const responseBody = await response.json();

      return {
        success: false,
        message: responseBody.message,
      };
    }

    if (response.status === 404) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    return { success: false, message: 'Something went wrong, try again!' };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'Failed to connect to server, try again!',
    };
  }
}
