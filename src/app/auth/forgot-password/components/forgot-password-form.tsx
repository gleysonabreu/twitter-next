'use client';

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
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useTransition } from 'react';
import { forgotPassword } from '@/actions/forgot-password';
import { toast } from 'sonner';

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();

  const forgotPasswordForm = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const { control, handleSubmit, reset, setError } = forgotPasswordForm;

  function handleSignIn(data: ForgotPasswordSchemaType) {
    startTransition(() => {
      forgotPassword(data).then((res) => {
        if (!res.success) {
          if (res.errors) {
            res.errors.map((error: any) => {
              setError(error.name as any, { message: error.message });
            });
          }

          toast.error(res.message);
          return;
        }

        toast.success(res.message);
        reset();
      });
    });
  }

  return (
    <Form {...forgotPasswordForm}>
      <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="Enter e-mail" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? <Loader2 className="animate-spin" /> : 'Send'}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <Button variant="secondary" className="w-full" type="button" asChild>
          <Link href="/auth/sign-in">Already have an account?</Link>
        </Button>
        <Button variant="secondary" className="w-full" type="button" asChild>
          <Link href="/auth/sign-up">Create new account</Link>
        </Button>
      </form>
    </Form>
  );
}
