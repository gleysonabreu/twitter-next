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
import { toast } from 'sonner';
import { Comment } from '@/types/comment';
import { getCommentById } from '@/actions/get-comment-by-id';
import { updateComment } from '@/actions/update-comment';

type EditCommentDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  commentId: string;
};

const updateCommentFormSchema = z.object({
  content: z.string().min(1).max(300),
});

export type UpdateCommentForm = z.infer<typeof updateCommentFormSchema>;

export function EditCommentDialog({
  open,
  commentId,
  setOpen,
}: EditCommentDialogProps) {
  const [comment, setComment] = useState<Comment | null>(null);
  const [isPending, startTransition] = useTransition();

  const updateForm = useForm<UpdateCommentForm>({
    resolver: zodResolver(updateCommentFormSchema),
    defaultValues: {
      content: '',
    },
    values: {
      content: comment?.content as string,
    },
  });

  const handleGetComment = useCallback(() => {
    startTransition(() => {
      getCommentById(commentId)
        .then((res) => {
          setComment(res);
        })
        .catch((error) => {
          setOpen(false);
          toast.error(error.message);
        });
    });
  }, [commentId, setOpen]);

  useEffect(() => {
    if (open) {
      handleGetComment();
    }
  }, [handleGetComment, open]);

  function handleUpdateComment(data: UpdateCommentForm) {
    startTransition(() => {
      updateComment(data, commentId).then((res) => {
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
          <DialogTitle>Edit comment</DialogTitle>
        </DialogHeader>
        <Form {...updateForm}>
          <form onSubmit={updateForm.handleSubmit(handleUpdateComment)}>
            <div className="flex flex-col items-end gap-4 p-4">
              <FormField
                control={updateForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea
                        disabled={isPending}
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
