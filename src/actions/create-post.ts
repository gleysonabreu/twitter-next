'use server';

import { PostFormSchema } from '@/app/(home)/(user)/components/post-form';
import { api } from '@/lib/api';
import { revalidatePath } from 'next/cache';

export async function createPost(data: PostFormSchema) {
  try {
    const res = await api('/posts', {
      cache: 'no-cache',
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 201) {
      revalidatePath('/');
      return { success: true, message: 'Post created!' };
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

    return { success: false, message: 'Something went wrong, try again!' };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to connect to server, try again!',
    };
  }
}
