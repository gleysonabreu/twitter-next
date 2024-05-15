'use client';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { registerUser } from '@/actions/register';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { Calendar } from '@/components/ui/calendar';

dayjs.extend(localizedFormat);

const signUpSchema = z.object({
  firstName: z.string().min(1).max(18).trim(),
  lastName: z.string().min(1).max(18).trim(),
  password: z.string().min(6).max(12).trim(),
  email: z.string().email().trim(),
  username: z.string().min(4).trim(),
  birthDate: z.date({ required_error: 'A date of birth is required.' }).refine(
    (date) => {
      const age = dayjs(new Date()).diff(date, 'years');

      return age >= 18;
    },
    { message: 'Only for over 18 years' },
  ),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const pastDate = new Date('01-01-1900');
  const dateNow = new Date();

  const navigate = useRouter();
  const [isPending, startTransition] = useTransition();

  const formSignUp = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      username: '',
    },
    mode: 'onChange',
  });
  const { handleSubmit, control, setError, reset } = formSignUp;

  async function createNewUser(data: SignUpSchema) {
    startTransition(() => {
      registerUser(data).then((res) => {
        if (!res.success) {
          if (res.errors) {
            res.errors.map((error: any) => {
              setError(error.name as any, { message: error.message });
            });
          }

          toast.error(res.message);
          return;
        }

        toast.success(res.message);
        reset();
        navigate.push('/auth/sign-in');
      });
    });
  }

  return (
    <Form {...formSignUp}>
      <form onSubmit={handleSubmit(createNewUser)}>
        <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-6">
          <FormField
            control={control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="sm:col-span-3">
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your first name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="sm:col-span-3">
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your last name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="username"
            render={({ field }) => (
              <FormItem className="sm:col-span-3">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="birthDate"
            render={({ field }) => (
              <FormItem className="sm:col-span-3">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          dayjs(field.value).format('LL')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      captionLayout="dropdown-buttons"
                      fromYear={pastDate.getFullYear()}
                      toYear={dateNow.getFullYear()}
                      defaultMonth={field.value}
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > dateNow || date < pastDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="sm:col-span-6">
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your e-mail"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem className="sm:col-span-6">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 mt-5">
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : 'Register'}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          <Button variant="secondary" className="w-full" asChild>
            <Link href="/auth/sign-in">Already have an account?</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
