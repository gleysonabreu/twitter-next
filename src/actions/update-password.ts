'use server';

import { ChangePasswordFormValues } from '@/app/(home)/settings/change-password-form';
import { api } from '@/lib/api';

export async function updatePassword(data: ChangePasswordFormValues) {
  try {
    const response = await api('/accounts/change-password', {
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

    return { success: false, message: 'Something went wrong, try again!' };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'Failed to connect to server, try again!',
    };
  }
}
