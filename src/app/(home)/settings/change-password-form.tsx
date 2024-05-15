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
import { toast } from 'sonner';
import { ReactNode, useTransition } from 'react';
import { updatePassword } from '@/actions/update-password';

const changePasswordFormSchema = z
  .object({
    password: z.string().min(6).max(12).trim(),
    newPassword: z.string().min(6).max(12).trim(),
    confirmPassword: z.string().min(6).max(12).trim(),
  })
  .refine((data) => data.password !== data.newPassword, {
    message: 'New password cannot be the same as the existing password',
    path: ['newPassword'],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'The passwords did not match',
    path: ['confirmPassword'],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>;

const defaultValues: Partial<ChangePasswordFormValues> = {
  confirmPassword: '',
  newPassword: '',
  password: '',
};

export function ChangePasswordForm({ children }: { children: ReactNode }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function handleChangePassword(data: ChangePasswordFormValues) {
    startTransition(() => {
      updatePassword(data).then((res) => {
        if (!res.success) {
          if (res.errors) {
            res.errors.map((error: any) =>
              form.setError(error.name, { message: error.message }),
            );
          }

          toast.error(res.message);
          return;
        }

        toast.success(res.message);
        form.reset();
      });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleChangePassword)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter you password"
                  {...field}
                />
              </FormControl>
              {children}
              <FormMessage />
            </FormItem>
          )}
        />
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

        <Button disabled={isPending} type="submit">
          Update password
        </Button>
      </form>
    </Form>
  );
}
