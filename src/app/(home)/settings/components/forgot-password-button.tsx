'use client';

import { forgotPassword } from '@/actions/forgot-password';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

type ForgotPasswordButtonProps = {
  email: string;
};

export function ForgotPasswordButton({ email }: ForgotPasswordButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleForgotPassword() {
    startTransition(() => {
      forgotPassword({ email }).then((res) => {
        if (!res.success) {
          if (res.errors) {
            res.errors.map((error: any) => {
              toast.error(error.message);
            });
          }

          toast.error(res.message);
          return;
        }

        toast.success(res.message);
      });
    });
  }

  return (
    <Button onClick={handleForgotPassword} disabled={isPending}>
      {isPending ? <Loader2 className="animate-spin" /> : 'Reset password'}
    </Button>
  );
}
