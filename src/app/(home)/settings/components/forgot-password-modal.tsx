import { currentUser } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ForgotPasswordButton } from './forgot-password-button';

export async function ForgotPasswordModal() {
  const user = await currentUser();

  if (!user) {
    throw new Error('You must be signed in to perform this action');
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0">
          Forgot password?
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Forgot Password</DialogTitle>
        </DialogHeader>
        <ForgotPasswordButton email={user.email} />
      </DialogContent>
    </Dialog>
  );
}
