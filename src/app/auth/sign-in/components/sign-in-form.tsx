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
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import { login } from '@/actions/sign-in';
import { useTransition } from 'react';

const signSchema = z.object({
  login: z.string().min(1),
  password: z.string().min(1),
});

export type SignSchemaType = z.infer<typeof signSchema>;

export function SignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const [isPending, startTransition] = useTransition();

  const signInForm = useForm<SignSchemaType>({
    resolver: zodResolver(signSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const { control, handleSubmit } = signInForm;

  function handleSignIn(data: SignSchemaType) {
    startTransition(() => {
      login(data, callbackUrl)
        .then((res) => {
          if (res?.error) {
            toast.error(res.error);
            return;
          }

          toast('Logged!');
        })
        .catch(() => toast.error('Something went wrong.'));
    });
  }

  return (
    <Form {...signInForm}>
      <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
        <FormField
          control={control}
          name="login"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail or username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your e-mail or username"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? <Loader2 className="animate-spin" /> : 'Log in'}
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
          <Link href="/auth/sign-up">Create new account</Link>
        </Button>
        <Button variant="link" className="w-full" type="button" asChild>
          <Link href="/auth/forgot-password">Forgot password?</Link>
        </Button>
      </form>
    </Form>
  );
}
