'use client';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import { User } from '@/types/user';
import { useTransition } from 'react';
import { updateAccount } from '@/actions/update-account';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

dayjs.extend(localizedFormat);

const updateAccountFormSchema = z.object({
  firstName: z.string().min(1).max(18).trim(),
  lastName: z.string().min(1).max(18).trim(),
  email: z.string().email().trim(),
  username: z.string().min(4).trim(),
  bio: z.string().optional(),
  birthDate: z.date({ required_error: 'A date of birth is required.' }).refine(
    (date) => {
      const age = dayjs(new Date()).diff(date, 'years');

      return age >= 18;
    },
    { message: 'Only for over 18 years' },
  ),
});

export type UpdateAccountFormValues = z.infer<typeof updateAccountFormSchema>;

export type AccountFormProps = {
  user: User;
};

export function AccountForm({ user }: AccountFormProps) {
  const pastDate = new Date('01-01-1900');
  const dateNow = new Date();

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const defaultValues: Partial<UpdateAccountFormValues> = {
    ...user,
    birthDate: new Date(user.birthDate),
    bio: user.bio ?? '',
  };

  const form = useForm<UpdateAccountFormValues>({
    resolver: zodResolver(updateAccountFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function handleUpdateAccount(data: UpdateAccountFormValues) {
    startTransition(() => {
      updateAccount(data).then((res) => {
        if (!res.success) {
          if (res.errors) {
            res.errors.map((error: any) =>
              form.setError(error.name, { message: error.message }),
            );
          }
          toast.error(res.message);
          return;
        }

        toast.success(res.message);
        router.refresh();
      });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdateAccount)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="First name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
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
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} type="submit">
          Update account
        </Button>
      </form>
    </Form>
  );
}
