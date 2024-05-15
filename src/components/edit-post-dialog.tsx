'use client';

import { Textarea } from './ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from 'react';
import { Loader2 } from 'lucide-react';
import { getPostById } from '@/actions/get-post-by-id';
import { toast } from 'sonner';
import { Post } from '@/types/post';
import { updatePost } from '@/actions/update-post';

type EditPostDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  postId: string;
};

const updatePostFormSchema = z.object({
  content: z.string().min(1).max(600),
});

export type UpdatePostForm = z.infer<typeof updatePostFormSchema>;

export function EditPostDialog({ open, postId, setOpen }: EditPostDialogProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [isPending, startTransition] = useTransition();

  const updateForm = useForm<UpdatePostForm>({
    resolver: zodResolver(updatePostFormSchema),
    defaultValues: {
      content: '',
    },
    values: {
      content: post?.content as string,
    },
  });

  const handleGetPost = useCallback(() => {
    startTransition(() => {
      getPostById(postId)
        .then((res) => {
          setPost(res);
        })
        .catch((error) => {
          setOpen(false);
          toast.error(error.message);
        });
    });
  }, [postId, setOpen]);

  useEffect(() => {
    if (open) {
      handleGetPost();
    }
  }, [handleGetPost, open]);

  function handleUpdatePost(data: UpdatePostForm) {
    startTransition(() => {
      updatePost(data, postId).then((res) => {
        if (!res.success) {
          if (res.errors) {
            res.errors.map((error: any) =>
              updateForm.setError(error.name, { message: error.message }),
            );
          }

          toast.error(res.message);
          return;
        }

        toast.success(res.message);
        setOpen(false);
      });
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit post</DialogTitle>
        </DialogHeader>
        <Form {...updateForm}>
          <form onSubmit={updateForm.handleSubmit(handleUpdatePost)}>
            <div className="flex flex-col items-end gap-4 p-4">
              <FormField
                control={updateForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea
                        placeholder="Enter some text to edit"
                        className="min-h-[100px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" /> : 'Confirm'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
