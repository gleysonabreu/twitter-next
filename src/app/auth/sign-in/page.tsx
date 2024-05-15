import { Metadata } from 'next';
import { SignInForm } from './components/sign-in-form';

export const metadata: Metadata = {
  title: 'Log in',
};

export default function SignIn() {
  return (
    <div className="p-8">
      <div className="flex w-full lg:w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
        </div>

        <SignInForm />
      </div>
    </div>
  );
}
