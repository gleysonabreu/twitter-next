'use client';

import { replyComment } from '@/actions/reply-comment';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const replyFormSchema = z.object({
  content: z.string().min(1).max(300),
});

export type ReplyFormSchema = z.infer<typeof replyFormSchema>;

export function ReplyForm({ commentId }: { commentId: string }) {
  const [isPending, startTransition] = useTransition();
  const replyForm = useForm<ReplyFormSchema>({
    resolver: zodResolver(replyFormSchema),
    defaultValues: {
      content: '',
    },
  });

  const { reset, setError, handleSubmit, control } = replyForm;

  function handleCreateReply(data: ReplyFormSchema) {
    startTransition(() => {
      replyComment(commentId, data).then((res) => {
        if (!res.success) {
          if (res.errors) {
            res.errors.map((error: any) =>
              setError(error.name, { message: error.message }),
            );
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
    <div className="bg-background/95 backdrop-blur border-b supports-[backdrop-filter]:bg-background/60">
      <Form {...replyForm}>
        <form onSubmit={handleSubmit(handleCreateReply)}>
          <div className="flex flex-col items-end gap-4 p-4">
            <FormField
              control={control}
              name="content"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Textarea
                      placeholder="Comment something?"
                      className="min-h-[100px] border-none resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : 'Comment'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
