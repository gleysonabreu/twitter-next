'use server';

import { api } from '@/lib/api';
import { revalidatePath } from 'next/cache';
import { update } from '../../auth';
import { currentUser } from './auth';

export async function updatePictureProfile(formData: FormData) {
  try {
    const response = await api('/users/profile-image', {
      cache: 'no-cache',
      method: 'PATCH',
      body: formData,
    });

    if (response.status === 201) {
      const responseBody = await response.json();

      const user = await currentUser();
      await update({
        user: {
          ...user,
          profileImage: responseBody.profileImage,
        },
      });

      revalidatePath('/');
      return {
        success: true,
        message: 'Picture changed!',
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
