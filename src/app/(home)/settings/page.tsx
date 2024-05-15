import { Separator } from '@/components/ui/separator';
import { ChangePasswordForm } from './change-password-form';
import { Metadata } from 'next';
import { ForgotPasswordModal } from './components/forgot-password-modal';

export const metadata: Metadata = {
  title: 'Change Password',
};

export default function SettingsChangePasswordPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Password</h3>
        <p className="text-sm text-muted-foreground">
          Change your password here
        </p>
      </div>

      <Separator />
      <ChangePasswordForm>
        <ForgotPasswordModal />
      </ChangePasswordForm>
    </div>
  );
}
