'use client';
import { DialogProps } from '@radix-ui/react-alert-dialog';
import React, { useEffect, useState, useTransition } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useDebounce } from 'use-debounce';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from './ui/command';
import { searchUser } from '@/actions/search-user';
import { Loader2, User as UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useRouter } from 'next/navigation';
import { UserDetails } from '@/types/user-details';
import { env } from '@/config/env';

export function CommandSearch({ ...props }: DialogProps) {
  const router = useRouter();
  const [text, setText] = useState('');
  const [query] = useDebounce(text, 750);
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = useState<UserDetails[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (query.length > 2) {
      startTransition(() => {
        searchUser(query, 1).then((res) => setUsers(res));
      });
    }
  }, [query]);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          'relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64',
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search users...</span>
        <span className="inline-flex lg:hidden">Search...</span>
      </Button>
      <CommandDialog shouldFilter={false} open={open} onOpenChange={setOpen}>
        <CommandInput
          value={text}
          onValueChange={(e) => setText(e)}
          placeholder="Search for a user..."
        />
        <CommandList>
          {isPending && (
            <CommandLoading className="flex items-center justify-center">
              <Loader2 className="animate-spin" />
            </CommandLoading>
          )}
          {users.length === 0 && !isPending && (
            <CommandEmpty>No results</CommandEmpty>
          )}

          {users.length > 0 && (
            <CommandGroup heading="Users">
              {users.map((user) => (
                <CommandItem
                  key={user.id}
                  className="gap-2"
                  value={user.firstName}
                  onSelect={() => {
                    runCommand(() => router.push(`/${user.username}`));
                  }}
                >
                  <Avatar>
                    {user.profileImage && (
                      <AvatarImage
                        src={`${env.NEXT_PUBLIC_URL_IMAGES}/${user.profileImage}`}
                        alt={user.username}
                      />
                    )}
                    <AvatarFallback>
                      {user.firstName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h2 className="font-bold">
                      {user.firstName} {user.lastName}
                    </h2>
                    <span className="text-sm text-muted-foreground">
                      @{user.username}
                    </span>
                    {user.isFollowing && (
                      <div className="flex items-center text-muted-foreground text-sm">
                        <UserIcon
                          className="fill-muted-foreground"
                          strokeWidth={0}
                        />
                        <span>Following</span>
                      </div>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
