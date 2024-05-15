import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="grid w-full place-items-center px-6 py-24 sm:py-32 lg:px-8 bg-background">
      <div className="flex flex-col items-center text-center gap-5">
        <Icons.logo className="w-20 h-20" />
        <p className="text-base font-semibold text-primary">404</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Post not found
        </h1>
        <p className="text-base leading-7 text-muted-foreground">
          Sorry, we couldn’t find the post you’re looking for.
        </p>
        <div className="flex items-center justify-center gap-x-6">
          <Button asChild>
            <Link href="/">Go back home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
