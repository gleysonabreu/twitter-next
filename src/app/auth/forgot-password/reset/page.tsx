import { Metadata } from 'next';
import { ResetPasswordForm } from './components/reset-password-form';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Reset password',
};

export default function ResetPassword({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { token } = searchParams;

  if (!token) {
    redirect('/auth/sign-in');
  }

  return (
    <div className="p-8">
      <div className="flex w-full lg:w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Reset Password
          </h1>
        </div>

        <ResetPasswordForm />
      </div>
    </div>
  );
}
