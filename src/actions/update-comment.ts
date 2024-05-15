'use server';

import { UpdateCommentForm } from '@/components/edit-comment-dialog';
import { api } from '@/lib/api';
import { revalidateTag } from 'next/cache';

export async function updateComment(data: UpdateCommentForm, id: string) {
  try {
    const response = await api(`/comments/${id}`, {
      cache: 'no-cache',
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 204) {
      revalidateTag('comments');
      return {
        success: true,
        message: 'Edited comment!',
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
