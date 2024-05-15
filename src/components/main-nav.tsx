'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { navMenu } from '@/config/nav-menu';

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6 text-sm">
      {navMenu.mainNav.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className={cn(
            'transition-colors hover:text-foreground/80 flex items-center gap-1',
            pathname?.startsWith(item.href)
              ? 'text-foreground'
              : 'text-foreground/60',
          )}
        >
          <item.icon size={20} />
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
