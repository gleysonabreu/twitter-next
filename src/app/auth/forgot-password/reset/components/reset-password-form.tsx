'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { resetPassword } from '@/actions/reset-password';
import { useRouter, useSearchParams } from 'next/navigation';

const resetPasswordFormSchema = z
  .object({
    newPassword: z.string().min(6).max(12).trim(),
    confirmPassword: z.string().min(6).max(12).trim(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'The passwords did not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;

const defaultValues: Partial<ResetPasswordFormValues> = {
  confirmPassword: '',
  newPassword: '',
};

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') as string;
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function handleResetPassword(data: ResetPasswordFormValues) {
    startTransition(() => {
      resetPassword(data, token).then((res) => {
        if (!res.success) {
          if (res.errors) {
            res.errors.map((error: any) => {
              form.setError(error.name as any, { message: error.message });
            });
          }

          toast.error(res.message);
          return;
        }

        toast.success(res.message);
        form.reset();
        router.push('/auth/sign-in');
      });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleResetPassword)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter you new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm new password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} type="submit" className="w-full">
          Reset password
        </Button>
      </form>
    </Form>
  );
}
