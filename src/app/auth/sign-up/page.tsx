import { Metadata } from 'next';
import { SignUpForm } from './components/sign-up-form';

export const metadata: Metadata = {
  title: 'Sign up',
};

export default function SignUp() {
  return (
    <div className="p-7">
      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create free account
          </h1>
        </div>

        <SignUpForm />
      </div>
    </div>
  );
}
