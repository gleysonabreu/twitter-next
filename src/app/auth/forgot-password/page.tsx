import { Metadata } from 'next';
import { ForgotPasswordForm } from './components/forgot-password-form';

export const metadata: Metadata = {
  title: 'Forgot password',
};

export default function ForgotPassword() {
  return (
    <div className="p-8">
      <div className="flex w-full lg:w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Forgot Password
          </h1>
        </div>

        <ForgotPasswordForm />
      </div>
    </div>
  );
}
