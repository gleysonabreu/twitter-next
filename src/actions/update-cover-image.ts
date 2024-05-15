'use server';

import { api } from '@/lib/api';
import { revalidatePath } from 'next/cache';

export async function updateCoverImage(formData: FormData) {
  try {
    const response = await api('/users/cover-image', {
      cache: 'no-cache',
      method: 'PATCH',
      body: formData,
    });

    if (response.status === 201) {
      revalidatePath('/');
      return {
        success: true,
        message: 'Cover image changed!',
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
