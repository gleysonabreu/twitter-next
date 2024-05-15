'use client';

import { createPost } from '@/actions/create-post';
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

const postFormSchema = z.object({
  content: z.string().min(1).max(600),
});

export type PostFormSchema = z.infer<typeof postFormSchema>;

export function PostForm() {
  const [isPending, startTransition] = useTransition();
  const postForm = useForm<PostFormSchema>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      content: '',
    },
  });

  const { reset, setError, handleSubmit, control } = postForm;

  function handleCreatePost(data: PostFormSchema) {
    startTransition(() => {
      createPost(data).then((res) => {
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
    <div className="bg-background/95 backdrop-blur first:border-b-0 border-b supports-[backdrop-filter]:bg-background/60">
      <Form {...postForm}>
        <form onSubmit={handleSubmit(handleCreatePost)}>
          <div className="flex flex-col items-end gap-4 p-4">
            <FormField
              control={control}
              name="content"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Textarea
                      placeholder="What is happening"
                      className="min-h-[100px] border-none resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : 'Post'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
