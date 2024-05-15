'use server';

import { UpdatePostForm } from '@/components/edit-post-dialog';
import { api } from '@/lib/api';
import { revalidateTag } from 'next/cache';

export async function updatePost(data: UpdatePostForm, id: string) {
  try {
    const response = await api(`/posts/${id}`, {
      cache: 'no-cache',
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 204) {
      revalidateTag('posts');
      return {
        success: true,
        message: 'Edited post!',
      };
    }

    if (response.status === 400) {
      const responseBody = await response.json();

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
