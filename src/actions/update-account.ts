'use server';

import { UpdateAccountFormValues } from '@/app/(home)/settings/account/account-form';
import { api } from '@/lib/api';
import { update } from '../../auth';
import { currentUser } from './auth';

export async function updateAccount(data: UpdateAccountFormValues) {
  try {
    const response = await api('/accounts', {
      cache: 'no-cache',
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 204) {
      const user = await currentUser();

      await update({
        user: {
          ...user,
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          email: data.email,
        },
      });

      return {
        success: true,
        message: 'Account updated!',
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

    if (response.status === 409) {
      const responseBody = await response.json();

      return { success: false, message: responseBody.message };
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
