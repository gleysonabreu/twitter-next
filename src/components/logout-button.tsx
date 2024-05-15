'use client';

import { logout } from '@/actions/logout';
import { DropdownMenuItem } from './ui/dropdown-menu';

export function LogoutButton() {
  const onSelect = () => {
    logout();
  };

  return <DropdownMenuItem onSelect={onSelect}>Log out</DropdownMenuItem>;
}
