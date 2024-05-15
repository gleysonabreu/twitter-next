import { MainNav } from './main-nav';
import { MobileNav } from './mobile-nav';
import { UserNav } from './user-nav';
import { ToggleTheme } from './toggle-theme';
import Link from 'next/link';
import { Icons } from './icons';
import { siteConfig } from '@/config/site';
import { CommandSearch } from './command-search';

export async function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icons.logo className="h-[35px] w-[40px] fill-primary" />
            <span className="hidden font-bold sm:inline-block">
              {siteConfig.name}
            </span>
          </Link>

          <MainNav />
        </div>

        <MobileNav />

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandSearch />
          </div>

          <nav className="flex items-center gap-2">
            <UserNav />
            <ToggleTheme />
          </nav>
        </div>
      </div>
    </header>
  );
}
