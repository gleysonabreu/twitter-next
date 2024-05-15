'use client';
import { Delete, Edit, Loader2, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { deleteComment } from '@/actions/delete-comment';
import { EditCommentDialog } from './edit-comment-dialog';
import { useRouter } from 'next/navigation';

type CommentMenuProps = {
  id: string;
};

export function CommentMenu({ id }: CommentMenuProps) {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleDeleteComment = () => {
    startTransition(() => {
      deleteComment(id).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        setShowAlertDialog(false);
        toast.success(res.message);
        router.back();
      });
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link" size="icon">
            <MoreHorizontal className="text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setShowDialog(true)}>
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setShowAlertDialog(true)}>
              <Delete className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditCommentDialog
        commentId={id}
        open={showDialog}
        setOpen={setShowDialog}
      />

      <AlertDialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              comment from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={handleDeleteComment}
              variant="destructive"
              disabled={isPending}
            >
              {isPending ? <Loader2 className="animate-spin" /> : 'Continue'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
