import { Separator } from '@/components/ui/separator';
import { AccountForm } from './account-form';
import { Metadata } from 'next';
import { getMe } from '@/actions/get-me';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Account',
};

export default async function SettingsAccount() {
  const user = await getMe();

  if (!user) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings
        </p>
      </div>

      <Separator />
      <AccountForm user={user} />
    </div>
  );
}
